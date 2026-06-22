import serverless from "serverless-http";
import app from "../../api/src/app.js";

export const handler = serverless(app);
