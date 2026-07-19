import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "dist/**",
    ".vinext/**",
    ".wrangler/**",
    ".pnpm-store/**",
    "build/**",
    "next-env.d.ts",
    ".openai/**",
    "app/chatgpt-auth.ts",
    "db/**",
    "drizzle/**",
    "examples/d1/**",
    "worker/**",
    "drizzle.config.ts",
    "vite.config.ts",
  ]),
]);

export default eslintConfig;
