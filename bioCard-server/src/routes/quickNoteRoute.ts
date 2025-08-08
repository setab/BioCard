import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  addQuickNote,
  getDoctorNotes,
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
  fastify.get("/api/getDoctorNotes", getDoctorNotes);
}
