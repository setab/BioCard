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

export async function getPatientAppointmentsById(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  const { id } = req.params;
  try {
    const appointments = await req.server.sql`
        SELECT * FROM appointments where patient_id=${id}
        `;
    if (appointments.length === 0)
      return res.status(404).send({ error: "User not found" });
    res.send(appointments).status(200);
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server error" });
  }
}
