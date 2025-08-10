import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  addQuickNote,
  getDoctorNotesByDoctorUserId,
} from "../controllers/quickNoteController.js";

export default async function quickNoteRoute(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  fastify.post(
    "/api/doctorNotes",
    {
      preHandler: fastify.authenticate,
    },
    addQuickNote
  );

  fastify.get<{ Params: { id: string } }>(
    "/api/getDoctorNotesByDoctorUserId/:id",
    getDoctorNotesByDoctorUserId
  );
}
