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

export async function patientInfoByNFCUID(
  req: FastifyRequest<{ Params: { nfcUID: string } }>,
  res: FastifyReply
) {
  try {
    const { nfcUID } = req.params;
    const patientInfo = await req.server.sql`
    SELECT
        p.id,
        p.blood_type,
        p.allergies,
        p.last_visit,
        u.name,
        u.email,
        u.gender,
        u.phone,
        ec.name AS emergency_contact_name,
        ec.relation AS emergency_contact_relation,
        ec.phone AS emergency_contact_phone
    FROM patients p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN emergency_contact ec ON ec.patient_id = p.id
    WHERE p.nfc_uid = ${nfcUID};
    `;
    if (patientInfo.length < 0)
      res.send({ error: "No patient available with this nfc uid" }).status(401);
    res.send(patientInfo[0]).status(200);
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

export async function getMedicalRecordByNFCUID(
  req: FastifyRequest<{ Params: { nfcUID: string } }>,
  res: FastifyReply
) {
  try {
    const { nfcUID } = req.params;
    const medicalRecords = await req.server.sql`
    SELECT
      mr.id, mr.diagnosis, 
      mr.created_at, mr.date, mr.notes, 
      mr.prescriptions, mr.procedures, mr.follow_up, 
      mr.images,
      u.name
    FROM medical_records mr
    JOIN patients p on p.id = mr.patient_id
    join doctors d on mr.doctor_id = d.id
    join users u on u.id = d.user_id
    WHERE p.nfc_uid = ${nfcUID}
    `;
    if (medicalRecords.length === 0) return res.status(200).send([]);
    res.send(medicalRecords).status(200);
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server error" });
  }
}

export async function getAppointmentDataByNFCUID(
  req: FastifyRequest<{ Params: { nfcUID: string } }>,
  res: FastifyReply
) {
  try {
    const { nfcUID } = req.params;
    const appointments = await req.server.sql`
    
    SELECT
        ap.id,
        ap.appointment_time,
        ap.reason,
        ap.status,
        ap.notes,
        du.name AS doctor_name
    FROM appointments ap
    JOIN patients p ON p.id = ap.patient_id
    JOIN doctors d ON d.id = ap.doctor_id
    JOIN users du ON du.id = d.user_id        -- doctor’s user record
    JOIN users pu ON pu.id = p.user_id        -- patient’s user record
    WHERE p.nfc_uid = '04D4C3B2A1';
    `;
    res.send(appointments).status(200);
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server Error " });
  }
}
