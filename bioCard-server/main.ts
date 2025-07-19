import Fastify from "fastify";
import userRoute from "./src/routes/user.js";
import dbPlugin from "./src/plugins/db.js";
import jwtPlugin from "./src/plugins/jwt.js";
import { logRequest } from "./src/hooks/onRequest.js";
import { env, isDevelopment } from "./src/config/env.js";
const fastify = Fastify({
  logger: isDevelopment,
});

//register
fastify.register(jwtPlugin);
fastify.register(dbPlugin);
fastify.register(userRoute);
fastify.addHook("onRequest", logRequest);

fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

fastify.get(
  "/test",
  // {
  //   onRequest: [logRequest],
  // },
  function (req, res) {
    res.send({ message: "this is test file " });
  }
);

const start = async () => {
  try {
    await fastify.listen({
      port: env.PORT,
      host: env.HOST,
    });
    console.log(`🚀 Server is listening at http://${env.HOST}:${env.PORT}`);
    console.log(`📝 Environment: ${env.NODE_ENV}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

// Graceful shutdown on Ctrl+C
process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down...");
  await fastify.close();
  process.exit(0);
});
