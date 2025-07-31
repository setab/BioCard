import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getPatientAppointments } from "../controllers/appointments.js";

async function patientRoute(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  //get
  fastify.get(
    "/api/getPatientAppointments",
    { preHandler: fastify.authenticate },
    getPatientAppointments
  );
}

export default patientRoute;
