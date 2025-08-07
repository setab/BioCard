import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { addQuickNote } from "../controllers/quickNoteController.js";

export default async function quickNoteRoute(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  fastify.post("/api/doctorNotes", addQuickNote);
}
