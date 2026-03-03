// Load .env.local (where secrets live), then .env as fallback
import dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.resolve(__dirname, ".env.local") });
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
});
