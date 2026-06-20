import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    isAdmin: v.optional(v.boolean()),
  }).index("by_token", ["tokenIdentifier"]),

  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(), // markdown
    category: v.string(), // Lab Launches | Teacher Training | Student Achievements | Industry News
    coverImage: v.optional(v.string()),
    author: v.string(),
    authorRole: v.optional(v.string()),
    published: v.boolean(),
    publishedAt: v.optional(v.string()), // ISO 8601
    tags: v.array(v.string()),
    readingTime: v.optional(v.number()), // minutes
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_published", ["published"]),

  // LMS Tables
  courses: defineTable({
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    labModule: v.string(), // ai | robotics | iot | arvr | coding | stem | creator | skill | space | rnd | incubation
    classLevel: v.number(), // 1–12
    coverImage: v.optional(v.string()),
    duration: v.optional(v.string()), // e.g. "8 hours"
    difficulty: v.string(), // beginner | intermediate | advanced
    published: v.boolean(),
    order: v.number(), // for sorting within a class+lab
  })
    .index("by_slug", ["slug"])
    .index("by_lab_module", ["labModule"])
    .index("by_class_level", ["classLevel"])
    .index("by_lab_and_class", ["labModule", "classLevel"])
    .index("by_published", ["published"]),

  lessons: defineTable({
    courseId: v.id("courses"),
    title: v.string(),
    content: v.string(), // markdown/rich text
    videoUrl: v.optional(v.string()),
    order: v.number(),
    duration: v.optional(v.number()), // minutes
    type: v.string(), // video | reading | quiz | activity
  })
    .index("by_course", ["courseId"])
    .index("by_course_order", ["courseId", "order"]),

  enrollments: defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    enrolledAt: v.string(), // ISO 8601
    completedAt: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_course", ["courseId"])
    .index("by_user_and_course", ["userId", "courseId"]),

  lessonProgress: defineTable({
    userId: v.id("users"),
    lessonId: v.id("lessons"),
    courseId: v.id("courses"),
    completedAt: v.string(), // ISO 8601
  })
    .index("by_user", ["userId"])
    .index("by_user_and_course", ["userId", "courseId"])
    .index("by_user_and_lesson", ["userId", "lessonId"]),

  inquiries: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    organization: v.string(),
    organizationType: v.string(), // school | college | university | other
    subject: v.string(),
    message: v.string(),
    status: v.string(), // new | read | replied
  }).index("by_status", ["status"]),
});
