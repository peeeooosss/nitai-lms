/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as inquiries from "../inquiries.js";
import type * as lms_courses from "../lms/courses.js";
import type * as lms_enrollments from "../lms/enrollments.js";
import type * as lms_lessons from "../lms/lessons.js";
import type * as lms_seed from "../lms/seed.js";
import type * as posts from "../posts.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  inquiries: typeof inquiries;
  "lms/courses": typeof lms_courses;
  "lms/enrollments": typeof lms_enrollments;
  "lms/lessons": typeof lms_lessons;
  "lms/seed": typeof lms_seed;
  posts: typeof posts;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
