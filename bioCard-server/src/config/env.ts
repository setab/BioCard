import { z } from "zod";
import "dotenv/config";

// Define the schema for environment variables
const envSchema = z.object({
  // Database
  DB_URL: z.string().min(1, "Database URL is required"),

  // Server
  PORT: z.string().transform(Number).pipe(z.number().int().positive()),
  HOST: z.string().min(1, "Host is required").default("localhost"),
  PGDATABASE: z.string().min(1, "PGDATABASE is required"),
  PGUSER: z.string().min(1, "PGUSER is required"),
  PGPASSWORD: z.string().min(1, "PGPASSWORD is required"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // JWT
  JWT_SECRET: z.string().min(8, "JWT secret must be at least 8 characters"),
  JWT_EXPIRES_IN: z.string().default("7d"),

  // CORS
  ALLOWED_ORIGINS: z
    .string()
    .transform((str) => str.split(",").map((s) => s.trim())),
});

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error("❌ Invalid environment variables:", error);
    process.exit(1);
  }
};

// Export the parsed and validated environment variables
export const env = parseEnv();

// Type for the environment variables
export type Env = z.infer<typeof envSchema>;

// Helper to check if we're in development
export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";
