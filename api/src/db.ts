import { readFileSync } from "node:fs";
import { PrismaClient } from "../generated/client/index.js";

// Load .env before PrismaClient reads it
try {
  const text = readFileSync(new URL("../.env", import.meta.url), "utf-8");
  for (const line of text.split("\n")) {
    const i = line.indexOf("=");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    if (!key || key.startsWith("#")) continue;
    let val = line.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
} catch {}

export const prisma = new PrismaClient();
