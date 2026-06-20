import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// Get all published courses, optionally filtered by lab module and/or class level
export const list = query({
  args: {
    labModule: v.optional(v.string()),
    classLevel: v.optional(v.number()),
    published: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("courses");
    if (args.labModule && args.classLevel !== undefined) {
      return await q
        .withIndex("by_lab_and_class", (qi) =>
          qi.eq("labModule", args.labModule!).eq("classLevel", args.classLevel!)
        )
        .filter((qi) =>
          args.published !== undefined
            ? qi.eq(qi.field("published"), args.published)
            : qi.eq(qi.field("published"), true)
        )
        .collect();
    }
    if (args.labModule) {
      return await q
        .withIndex("by_lab_module", (qi) => qi.eq("labModule", args.labModule!))
        .filter((qi) =>
          args.published !== undefined
            ? qi.eq(qi.field("published"), args.published)
            : qi.eq(qi.field("published"), true)
        )
        .collect();
    }
    if (args.classLevel !== undefined) {
      return await q
        .withIndex("by_class_level", (qi) => qi.eq("classLevel", args.classLevel!))
        .filter((qi) =>
          args.published !== undefined
            ? qi.eq(qi.field("published"), args.published)
            : qi.eq(qi.field("published"), true)
        )
        .collect();
    }
    return await q
      .withIndex("by_published", (qi) =>
        qi.eq("published", args.published !== undefined ? args.published : true)
      )
      .collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const getById = query({
  args: { id: v.id("courses") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Admin: create course
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    labModule: v.string(),
    classLevel: v.number(),
    coverImage: v.optional(v.string()),
    duration: v.optional(v.string()),
    difficulty: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError({ message: "Unauthenticated", code: "UNAUTHENTICATED" });
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    if (!user?.isAdmin) throw new ConvexError({ message: "Forbidden", code: "FORBIDDEN" });

    return await ctx.db.insert("courses", { ...args, published: false });
  },
});

// Admin: update course
export const update = mutation({
  args: {
    id: v.id("courses"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    labModule: v.optional(v.string()),
    classLevel: v.optional(v.number()),
    coverImage: v.optional(v.string()),
    duration: v.optional(v.string()),
    difficulty: v.optional(v.string()),
    published: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError({ message: "Unauthenticated", code: "UNAUTHENTICATED" });
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    if (!user?.isAdmin) throw new ConvexError({ message: "Forbidden", code: "FORBIDDEN" });

    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

// Admin: delete course
export const remove = mutation({
  args: { id: v.id("courses") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError({ message: "Unauthenticated", code: "UNAUTHENTICATED" });
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    if (!user?.isAdmin) throw new ConvexError({ message: "Forbidden", code: "FORBIDDEN" });
    await ctx.db.delete(args.id);
  },
});
