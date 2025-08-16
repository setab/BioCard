import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  getMedicalHistoryById,
  patientInfoByNFCUID,
} from "../controllers/medical_history.js";

async function medicalHistoryRoute(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  fastify.get<{ Params: { id: string } }>(
    "/api/getMedicalHistoryById/:id",
    getMedicalHistoryById
  );
  fastify.get<{ Params: { nfcUID: string } }>(
    "/api/patientInfoByNFCUID/:nfcUID",
    patientInfoByNFCUID
  );
}
export default medicalHistoryRoute;
