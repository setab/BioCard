// plugins/static.ts
import fp from "fastify-plugin";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default fp(async (fastify) => {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../../uploads"),
    prefix: "/uploads/", // Image will be available at http://localhost:PORT/uploads/filename.jpg
  });
});
