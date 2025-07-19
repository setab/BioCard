import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    db: FastifyInstance["pg"];
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
    func: () => string;
  }
}
