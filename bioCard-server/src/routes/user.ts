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
  logoutUser,
  getProfile,
} from "../controllers/userController.js";

async function userRoute(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  //gets
  fastify.get(
    "/api/alluser",
    { preHandler: [fastify.authenticate] },
    getAllUsers
  );
  fastify.get<{ Params: { id: string } }>(
    "/api/user/:id",
    {
      preHandler: [fastify.authenticate],
      schema: createUserSchema,
    },

    getUserById
  );
  fastify.get("/api/logout", logoutUser);
  fastify.get(
    "/api/getProfile",
    { preHandler: [fastify.authenticate] },
    getProfile
  );

  //posts
  fastify.post("/api/login", loginUser);
  fastify.post("/api/signin", signinUser);
  fastify.post("/api/admin", addAdminUser);
}

export default userRoute;
