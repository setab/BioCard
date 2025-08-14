import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getMedicalHistoryById } from "../controllers/medical_history.js";

async function medicalHistoryRoute(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  fastify.get<{ Params: { id: string } }>(
    "/api/getMedicalHistoryById/:id",
    getMedicalHistoryById
  );
}
export default medicalHistoryRoute;
