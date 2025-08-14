import { FastifyReply, FastifyRequest } from "fastify";

export async function getMedicalHistoryById(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  try {
    const { id } = req.params;
    const medical_history = await req.server.sql`
    SELECT 
        p.id AS patient_id,
        p.blood_type,
        p.allergies,
        p.last_visit,
        u.name AS user_name,
        u.email AS user_email,

        mr.id AS medical_record_id,
        mr.doctor_id AS mr_doctor_id,
        mr.created_at AS mr_created_at,
        mr.date AS mr_date,
        mr.diagnosis AS mr_diagnosis,
        mr.notes AS mr_notes,
        mr.prescriptions AS mr_prescriptions,
        mr.procedures AS mr_procedures,
        mr.follow_up AS mr_follow_up,
        mr.images AS mr_images,

        dn.id AS doctor_note_id,
        dn.note AS dn_note,
        dn.status AS dn_status,
        dn.images AS dn_images,
        dn.created_at AS dn_created_at,
        dn.updated_at AS dn_updated_at,

        ap.id AS appointment_id,
        ap.doctor_id AS ap_doctor_id,
        ap.appointment_time AS ap_time,
        ap.reason AS ap_reason,
        ap.status AS ap_status,
        ap.notes AS ap_notes,
        ap.created_at AS ap_created_at

    FROM patients p
    JOIN users u 
        ON p.user_id = u.id
    LEFT JOIN medical_records mr 
        ON p.id = mr.patient_id
    LEFT JOIN doctor_notes dn 
        ON p.id = dn.patient_id
    LEFT JOIN appointments ap 
        ON p.id = ap.patient_id
    WHERE p.id = ${id};
    `;
    res.send(medical_history);
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
}
