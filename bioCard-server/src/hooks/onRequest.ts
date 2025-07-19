import { FastifyReply, FastifyRequest } from "fastify";

export const logRequest = async (req: FastifyRequest, reply: FastifyReply) => {
  console.log(`methods ${req.method} url: ${req.url}`);
};
