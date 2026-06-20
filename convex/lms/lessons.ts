import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

export const listByCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lessons")
      .withIndex("by_course_order", (q) => q.eq("courseId", args.courseId))
      .order("asc")
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("lessons") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    content: v.string(),
    videoUrl: v.optional(v.string()),
    order: v.number(),
    duration: v.optional(v.number()),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError({ message: "Unauthenticated", code: "UNAUTHENTICATED" });
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    if (!user?.isAdmin) throw new ConvexError({ message: "Forbidden", code: "FORBIDDEN" });
    return await ctx.db.insert("lessons", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("lessons"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    order: v.optional(v.number()),
    duration: v.optional(v.number()),
    type: v.optional(v.string()),
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

export const remove = mutation({
  args: { id: v.id("lessons") },
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
