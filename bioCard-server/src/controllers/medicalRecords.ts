import { FastifyRequest, FastifyReply } from "fastify";

export async function getMedicalRecords(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const medicalRecords = await req.server.sql`
        select
        m.*,
        u.name
        from users u
        join patients p on u.id=p.user_id
        join medical_records m on m.patient_id=p.id
    `;
    res.send(medicalRecords);
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server error" });
  }
}

export async function getMedicalRecordById(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  try {
    const { id } = req.params;
    const medicalRecords = await req.server.sql`
    SELECT
      m.*,
      du.name AS doctor_name
    FROM users u
    JOIN patients p ON u.id = p.user_id
    JOIN medical_records m ON m.patient_id = p.id
    JOIN doctors d ON m.doctor_id = d.id
    JOIN users du ON d.user_id = du.id
    WHERE u.id = ${id}
    `;
    if (medicalRecords.length === 0) return res.status(200).send([]);
    res.send(medicalRecords);
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server error" });
  }
}
