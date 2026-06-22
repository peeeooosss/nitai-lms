import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

const FREE_TRIAL_LIMIT = 5;

export const canAccessLab = query({
  args: {
    labId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return { allowed: false, reason: "unauthenticated" };

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (!user) return { allowed: false, reason: "unauthenticated" };

    if (user.subscriptionStatus === "active") {
      return { allowed: true, reason: "subscribed" };
    }

    const remaining = FREE_TRIAL_LIMIT - (user.trialsUsed ?? 0);
    if (remaining > 0) {
      return { allowed: true, reason: "trial", remaining };
    }

    return { allowed: false, reason: "exhausted", remaining: 0 };
  },
});

export const useTrial = mutation({
  args: {
    labId: v.string(),
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

    if (user.subscriptionStatus === "active") {
      return { used: false, reason: "subscribed" };
    }

    const used = user.trialsUsed ?? 0;
    if (used >= FREE_TRIAL_LIMIT) {
      throw new ConvexError({ code: "PRECONDITION_FAILED", message: "No trials remaining" });
    }

    await ctx.db.patch(user._id, {
      trialsUsed: used + 1,
    });

    await ctx.db.insert("trialUsage", {
      userId: user._id,
      labId: args.labId as any,
      usedAt: new Date().toISOString(),
    });

    return { used: true, remaining: FREE_TRIAL_LIMIT - (used + 1) };
  },
});
