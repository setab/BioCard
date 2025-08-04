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

export async function getPatientCountForDoctorWithId(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  const { id } = req.params;
  try {
    const result = await req.server.sql`
          SELECT count(*)::int as count
          FROM appointments a
          JOIN doctors d ON a.doctor_id = d.id
          JOIN users u ON d.user_id = u.id
          WHERE u.id = ${id};
    `;
    res.send(result[0].count).status(200);
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server error" });
  }
}

export async function getPatientInfoWithDoctorId(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  const { id } = req.params;
  try {
    const result = await req.server.sql`
      SELECT 
      a.id AS appointment_id,
      a.appointment_time,
      a.reason,
      a.status,
      du.name AS doctor_name,
      du.id AS doctor_user_id,
      pu.name AS patient_name,
      pu.id AS patient_user_id
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      JOIN users du ON d.user_id = du.id
      JOIN patients p ON a.patient_id = p.id
      JOIN users pu ON p.user_id = pu.id
      WHERE du.id = '11f729dc-9363-4310-9fb6-7eabdf259c5a';

    `;
    if (result.length === 0) return res.status(200).send([]);
    res.send(result).status(200);
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server error" });
  }
}
