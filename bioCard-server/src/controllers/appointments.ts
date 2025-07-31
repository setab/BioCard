import { FastifyReply, FastifyRequest } from "fastify";

export async function getPatientAppointments(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const appointments = await req.server.sql`
        SELECT * FROM appointments
        `;
    res.send(appointments).status(200);
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server error" });
  }
}
