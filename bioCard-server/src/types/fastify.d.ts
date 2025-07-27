import "fastify";
import { Sql } from "postgres";

declare module "fastify" {
  interface FastifyInstance {
    // db: FastifyInstance["pg"];
    sql: Sql;
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
    func: () => string;
  }
  interface FastifyRequest {
    server: FastifyInstance;
  }
}
