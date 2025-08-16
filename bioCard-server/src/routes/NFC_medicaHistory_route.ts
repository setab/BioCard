import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  getAppointmentDataByNFCUID,
  getMedicalHistoryById,
  getMedicalRecordByNFCUID,
  patientInfoByNFCUID,
} from "../controllers/NFC_medical_history.js";

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
  fastify.get<{ Params: { nfcUID: string } }>(
    "/api/getMedicalRecordByNFCUID/:nfcUID",
    getMedicalRecordByNFCUID
  );
  fastify.get<{ Params: { nfcUID: string } }>(
    "/api/getAppointmentDataByNFCUID/:nfcUID",
    getAppointmentDataByNFCUID
  );
}
export default medicalHistoryRoute;
