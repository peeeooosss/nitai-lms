import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

const LAB_IDS = [
  "ai-lab", "robotics-lab", "iot-lab", "arvr-lab", "coding-lab",
  "stem-lab", "creator-lab", "skill-lab", "space-lab", "rnd-lab",
  "incubation-lab", "ai-tools-lab", "agentic-ai-lab", "automated-lab",
  "autonomous-lab", "ir50-lab", "future-workforce-lab", "picto-lab", "python-lab",
] as const;

export const getByUserAndLab = query({
  args: {
    labId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (!user) return null;

    return await ctx.db
      .query("studentProgress")
      .withIndex("by_user_and_lab", (q) =>
        q.eq("userId", user._id).eq("labId", args.labId as typeof LAB_IDS[number]),
      )
      .unique();
  },
});

export const completeChallenge = mutation({
  args: {
    labId: v.string(),
    challengeId: v.string(),
    xpReward: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({ code: "UNAUTHENTICATED", message: "Not logged in" });
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (!user) {
      throw new ConvexError({ code: "NOT_FOUND", message: "User not found" });
    }

    const existingProgress = await ctx.db
      .query("studentProgress")
      .withIndex("by_user_and_lab", (q) =>
        q.eq("userId", user._id).eq("labId", args.labId as typeof LAB_IDS[number]),
      )
      .unique();

    const today = new Date().toISOString().split("T")[0];
    const labId = args.labId as typeof LAB_IDS[number];

    if (existingProgress) {
      if (existingProgress.completedChallenges.includes(args.challengeId)) {
        return { alreadyCompleted: true, progress: existingProgress };
      }

      let streak = existingProgress.streakCount ?? 0;
      if (existingProgress.lastCompletedDate === today) {
        streak = Math.max(streak, 1);
      } else {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        streak = existingProgress.lastCompletedDate === yesterday ? streak + 1 : 1;
      }

      const updatedChallenges = [...existingProgress.completedChallenges, args.challengeId];
      const updatedXp = (existingProgress.xpEarned ?? 0) + args.xpReward;

      await ctx.db.patch(existingProgress._id, {
        completedChallenges: updatedChallenges,
        xpEarned: updatedXp,
        streakCount: streak,
        lastCompletedDate: today,
      });

      await ctx.db.patch(user._id, {
        totalXp: (user.totalXp ?? 0) + args.xpReward,
      });

      return { alreadyCompleted: false, xpEarned: args.xpReward };
    }

    await ctx.db.insert("studentProgress", {
      userId: user._id,
      labId,
      completedChallenges: [args.challengeId],
      xpEarned: args.xpReward,
      streakCount: 1,
      lastCompletedDate: today,
      startedAt: new Date().toISOString(),
    });

    await ctx.db.patch(user._id, {
      totalXp: (user.totalXp ?? 0) + args.xpReward,
    });

    return { alreadyCompleted: false, xpEarned: args.xpReward };
  },
});
