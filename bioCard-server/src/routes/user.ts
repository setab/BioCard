import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { createUserSchema } from "../schemas/userSchema.js";
import {
  getAllUsers,
  loginUser,
  signinUser,
  getUserById,
} from "../controllers/userController.js";

async function userRoute(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  fastify.get(
    "/api/alluser",
    { preHandler: [fastify.authenticate] },
    getAllUsers
  );
  fastify.post("/api/login", loginUser);
  fastify.post("/api/signin", signinUser);
  fastify.get<{ Params: { name: string } }>(
    "/api/user/:name",
    {
      schema: createUserSchema,
    },
    getUserById
  );
}

export default userRoute;
