import { z } from "zod";

// Define the schema for environment variables
const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url("Invalid API base URL"),
  VITE_APP_NAME: z.string().min(1, "App name is required"),
  VITE_APP_VERSION: z.string().min(1, "App version is required"),
  VITE_ENABLE_DEV_TOOLS: z
    .string()
    .transform((val) => val === "true")
    .pipe(z.boolean()),
});

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(import.meta.env);
  } catch (error) {
    console.error("❌ Invalid environment variables:", error);
    throw new Error("Invalid environment configuration");
  }
};

// Export the parsed and validated environment variables
export const env = parseEnv();

// Type for the environment variables
export type Env = z.infer<typeof envSchema>;
