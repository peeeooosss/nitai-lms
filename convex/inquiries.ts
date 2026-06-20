import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

// Helper to assert admin
async function requireAdmin(ctx: { auth: { getUserIdentity: () => Promise<{ tokenIdentifier: string } | null> }; db: { query: (table: string) => { withIndex: (index: string, fn: (q: { eq: (field: string, value: string) => unknown }) => unknown) => { unique: () => Promise<{ isAdmin?: boolean } | null> } } } }) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new ConvexError({ message: "Not authenticated", code: "UNAUTHENTICATED" });
  const user = await ctx.db
    .query("users")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
    .unique();
  if (!user?.isAdmin) throw new ConvexError({ message: "Admin access required", code: "FORBIDDEN" });
  return user;
}

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    organization: v.string(),
    organizationType: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.name.trim() || !args.email.trim() || !args.organization.trim() || !args.message.trim()) {
      throw new ConvexError({ message: "Please fill all required fields.", code: "BAD_REQUEST" });
    }
    const id = await ctx.db.insert("inquiries", {
      ...args,
      status: "new",
    });
    return id;
  },
});

export const listAdmin = query({
  args: {
    status: v.optional(v.string()),
    organizationType: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    if (!user?.isAdmin) return null;

    let results;
    if (args.status) {
      results = await ctx.db
        .query("inquiries")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    } else {
      results = await ctx.db.query("inquiries").order("desc").collect();
    }

    if (args.organizationType) {
      results = results.filter((r) => r.organizationType === args.organizationType);
    }

    return results;
  },
});

export const stats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    if (!user?.isAdmin) return null;

    const all = await ctx.db.query("inquiries").collect();
    const total = all.length;
    const byStatus = {
      new: all.filter((i) => i.status === "new").length,
      read: all.filter((i) => i.status === "read").length,
      replied: all.filter((i) => i.status === "replied").length,
    };
    const byType: Record<string, number> = {};
    for (const inq of all) {
      byType[inq.organizationType] = (byType[inq.organizationType] ?? 0) + 1;
    }
    return { total, byStatus, byType };
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("inquiries"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx as Parameters<typeof requireAdmin>[0]);
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const makeAdmin = mutation({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    // Anyone can call this to make themselves admin — suitable for initial setup
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError({ message: "Not authenticated", code: "UNAUTHENTICATED" });
    if (identity.tokenIdentifier !== args.tokenIdentifier) {
      throw new ConvexError({ message: "You can only make yourself admin", code: "FORBIDDEN" });
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    if (!user) throw new ConvexError({ message: "User not found", code: "NOT_FOUND" });
    await ctx.db.patch(user._id, { isAdmin: true });
    return { success: true };
  },
});

// Legacy — keep for backwards compatibility
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("inquiries").order("desc").take(100);
  },
});
