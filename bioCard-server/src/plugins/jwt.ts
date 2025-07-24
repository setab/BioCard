import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";

export default fp(async (fastify, opts) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  await fastify.register(fastifyJwt, {
    secret: jwtSecret,
    cookie: {
      cookieName: "session_token",
      signed: false,
    },
  });

  fastify.decorate(
    "authenticate",
    async function (req: FastifyRequest, res: FastifyReply) {
      try {
        await req.jwtVerify();
      } catch (err) {
        res.send(err);
      }
    }
  );
});
