import serverless from "serverless-http";
import app from "../../api/src/app.js";

// Netlify Functions receive the full path including the function prefix
// e.g. /.netlify/functions/api/auth/signup
// We strip the prefix and add /api if not already present
export const handler = serverless(app, {
  request: (req, event) => {
    const prefix = event.path.match(/^\/\.netlify\/functions\/[^/]+/)?.[0];
    if (prefix) {
      const remaining = event.path.slice(prefix.length) || "/";
      req.url = remaining.startsWith("/api") ? remaining : "/api" + remaining;
    }
    // Parse JSON body and mark as done so body-parser skips
    if (event.body && typeof event.body === "string" && event.headers?.["content-type"]?.includes("json")) {
      try {
        req.body = JSON.parse(event.body);
        req._body = true;
      } catch {}
    }
  },
});
