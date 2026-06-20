import { query, mutation } from "../_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// Get current user's enrollments with course data
export const myEnrollments = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    if (!user) return [];

    const enrollments = await ctx.db
      .query("enrollments")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const withCourses = await Promise.all(
      enrollments.map(async (e) => {
        const course = await ctx.db.get(e.courseId);
        return { ...e, course };
      })
    );
    return withCourses.filter((e) => e.course !== null);
  },
});

export const isEnrolled = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    if (!user) return false;
    const enrollment = await ctx.db
      .query("enrollments")
      .withIndex("by_user_and_course", (q) =>
        q.eq("userId", user._id).eq("courseId", args.courseId)
      )
      .unique();
    return enrollment !== null;
  },
});

export const enroll = mutation({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError({ message: "Unauthenticated", code: "UNAUTHENTICATED" });
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    if (!user) throw new ConvexError({ message: "User not found", code: "NOT_FOUND" });

    // Check not already enrolled
    const existing = await ctx.db
      .query("enrollments")
      .withIndex("by_user_and_course", (q) =>
        q.eq("userId", user._id).eq("courseId", args.courseId)
      )
      .unique();
    if (existing) return existing._id;

    return await ctx.db.insert("enrollments", {
      userId: user._id,
      courseId: args.courseId,
      enrolledAt: new Date().toISOString(),
    });
  },
});

export const unenroll = mutation({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError({ message: "Unauthenticated", code: "UNAUTHENTICATED" });
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    if (!user) throw new ConvexError({ message: "User not found", code: "NOT_FOUND" });

    const enrollment = await ctx.db
      .query("enrollments")
      .withIndex("by_user_and_course", (q) =>
        q.eq("userId", user._id).eq("courseId", args.courseId)
      )
      .unique();
    if (enrollment) await ctx.db.delete(enrollment._id);
  },
});

// Progress
export const myProgress = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    if (!user) return [];
    return await ctx.db
      .query("lessonProgress")
      .withIndex("by_user_and_course", (q) =>
        q.eq("userId", user._id).eq("courseId", args.courseId)
      )
      .collect();
  },
});

export const markLessonComplete = mutation({
  args: { lessonId: v.id("lessons"), courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError({ message: "Unauthenticated", code: "UNAUTHENTICATED" });
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    if (!user) throw new ConvexError({ message: "User not found", code: "NOT_FOUND" });

    const existing = await ctx.db
      .query("lessonProgress")
      .withIndex("by_user_and_lesson", (q) =>
        q.eq("userId", user._id).eq("lessonId", args.lessonId)
      )
      .unique();
    if (existing) return existing._id;

    return await ctx.db.insert("lessonProgress", {
      userId: user._id,
      lessonId: args.lessonId,
      courseId: args.courseId,
      completedAt: new Date().toISOString(),
    });
  },
});
