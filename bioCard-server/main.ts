import Fastify from "fastify";
import userRoute from "./src/routes/user.js";
import dbPlugin from "./src/plugins/db.js";
import jwtPlugin from "./src/plugins/jwt.js";
import { logRequest } from "./src/hooks/onRequest.js";
import { env, isDevelopment } from "./src/config/env.js";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
const app = Fastify({
  logger: isDevelopment,
});

// Register CORS first
app.register(cors, {
  origin: "http://localhost:5173",
  credentials: true,
});
// Then register other plugins
app.register(fastifyCookie);
app.register(jwtPlugin);
app.register(dbPlugin);
app.register(userRoute);
app.addHook("onRequest", logRequest);

app.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

app.get(
  "/test",
  {
    onRequest: [logRequest],
  },
  function (req, res) {
    res.send({ message: "this is test file " });
  }
);

const start = async () => {
  try {
    await app.listen({
      port: env.PORT,
      host: env.HOST,
    });
    console.log(`🚀 Server is listening at http://${env.HOST}:${env.PORT}`);
    console.log(`📝 Environment: ${env.NODE_ENV}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

// Graceful shutdown on Ctrl+C
process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down...");
  await app.close();
  process.exit(0);
});
