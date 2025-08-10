import { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import { mkdir } from "fs/promises";

export async function addQuickNote(req: FastifyRequest, res: FastifyReply) {
  try {
    await mkdir("./uploads/doctorNotes", { recursive: true });
    const files: string[] = [];
    let note = "";
    let status = "";
    let filePath = "";
    let userId = "";
    let patient_id = "";

    for await (const part of req.parts()) {
      if (part.file) {
        const timeStamp = Date.now();
        filePath = `./uploads/doctorNotes/${timeStamp}-${part.filename}`;
        await new Promise((resolve, reject) => {
          const writeStream = fs.createWriteStream(filePath);
          part.file.pipe(writeStream);
          part.file.on("end", resolve);
          part.file.on("error", reject);
        });
        files.push(filePath);
      } else {
        if (part.fieldname === "note") note = part.value as string;
        if (part.fieldname === "status") status = part.value as string;
        if (part.fieldname === "userId") userId = part.value as string;
        if (part.fieldname === "patient_id") patient_id = part.value as string;
      }
    }

    if (!note.trim()) {
      return res.status(400).send({ error: "Note is required" });
    }
    if (!userId.trim()) {
      return res.status(400).send({ error: "User ID is required" });
    }
    // if (files.length === 0) {
    //   return res.status(400).send({ error: "No file uploaded" });
    // }
    console.log(
      `note: ${note}, status: ${status}, userId: ${userId}, files: ${files.length}, patient_id: ${patient_id}`
    );
    const result = await req.server.sql`
        insert into doctor_notes(
          user_id, note, status, images, patient_id, created_by, updated_by
        ) values(
          ${userId}, ${note}, ${status}::health_status, ${files},${patient_id}, ${userId}, ${userId}
        ) RETURNING *
    `;

    res.send({
      success: true,
      data: result[0],
    });
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

export async function getDoctorNotesByDoctorUserId(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  const { id } = req.params;
  try {
    const result = await req.server.sql`
    select 
    du.id, du.note, du.status, du.images
    from doctor_notes du
    join users u on du.user_id = u.id
    where du.user_id = ${id}::uuid
    `;
    res.status(200).send(result);
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
}
