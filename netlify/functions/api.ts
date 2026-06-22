import serverless from "serverless-http";
import app from "../../api/src/app.js";

// Netlify Functions receive the full path including the function prefix
// e.g. /.netlify/functions/api/auth/signup
// We strip the prefix and restore /api so routes match
export const handler = serverless(app, {
  request: (req, event) => {
    const prefix = event.path.match(/^\/\.netlify\/functions\/[^/]+/)?.[0];
    if (prefix) {
      req.url = "/api" + (event.path.slice(prefix.length) || "");
    }
  },
});
