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
    // const appointments = await req.server.sql`
    //       select
    //       a.*,
    //       d.department,
    //       d.license_number,
    //       u.name
    //       from appointments a
    //       join patients p on a.patient_id = p.id
    //       join doctors d on a.doctor_id = d.id
    //       join users u on p.user_id = u.id
    //       where u.id = ${id}
    //     `;
    const appointments = await req.server.sql`
            SELECT
              a.*,
              d.department,
              d.license_number,
              du.name AS doctor_name
            FROM appointments a
            JOIN patients p ON a.patient_id = p.id
            JOIN doctors d ON a.doctor_id = d.id
            JOIN users du ON d.user_id = du.id
            WHERE p.user_id = ${id}
          `;
    if (appointments.length === 0) return res.status(200).send([]);
    res.send(appointments).status(200);
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server error" });
  }
}
