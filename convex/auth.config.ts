import { AuthConfig } from "convex/server";

const hasOidcConfig =
  process.env.HERCULES_OIDC_AUTHORITY && process.env.HERCULES_OIDC_CLIENT_ID;

export default {
  providers: hasOidcConfig
    ? [
        {
          domain: process.env.HERCULES_OIDC_AUTHORITY!,
          applicationID: process.env.HERCULES_OIDC_CLIENT_ID!,
        },
      ]
    : [],
} satisfies AuthConfig;
