import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  getMedicalRecordById,
  getMedicalRecords,
} from "../controllers/medicalRecords.js";
import {
  getMedicalRecordSchema,
  getMedicalRecordByIdSchema,
} from "../schemas/medicalRecordSchema.js";

async function medicalRecordRoute(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  fastify.get(
    "/api/getMedicalRecords",
    {
      preHandler: fastify.authenticate,
      schema: getMedicalRecordSchema,
    },
    getMedicalRecords
  );
  fastify.get<{ Params: { id: string } }>(
    "/api/getMedicalRecordById/:id",
    {
      preHandler: fastify.authenticate,
      schema: getMedicalRecordByIdSchema,
    },
    getMedicalRecordById
  );
}

export default medicalRecordRoute;
