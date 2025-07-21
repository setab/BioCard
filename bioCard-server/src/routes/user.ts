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
  addAdminUser,
} from "../controllers/userController.js";

async function userRoute(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  fastify.get(
    "/api/alluser",
    { preHandler: [fastify.authenticate] },
    getAllUsers
  );
  fastify.post("/api/login", loginUser);
  fastify.post("/api/signin", signinUser);
  fastify.get<{ Params: { id: string } }>(
    "/api/user/:id",
    {
      schema: createUserSchema,
    },
    getUserById
  );
  fastify.post("/api/admin", addAdminUser);
}

export default userRoute;
