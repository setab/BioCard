import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  getPatientAppointments,
  getPatientAppointmentsById,
  getPatientCountForDoctorWithId,
  getPatientInfoWithDoctorId,
} from "../controllers/appointments.js";
import { getPatientAppointmentsByIdSchema } from "../schemas/appointmentScham.js";

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
  fastify.get<{ Params: { id: string } }>(
    "/api/getPatientAppointments/:id",
    {
      preHandler: fastify.authenticate,
      schema: getPatientAppointmentsByIdSchema,
    },
    getPatientAppointmentsById
  );
  fastify.get<{ Params: { id: string } }>(
    "/api/getPatientCountForDoctorWithId/:id",
    {
      preHandler: fastify.authenticate,
    },
    getPatientCountForDoctorWithId
  );

  fastify.get<{ Params: { id: string } }>(
    "/api/getPatientInfoWithDoctorId/:id",
    {
      preHandler: fastify.authenticate,
    },
    getPatientInfoWithDoctorId
  );
}

export default patientRoute;
