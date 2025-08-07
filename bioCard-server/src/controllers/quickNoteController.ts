import { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";

import { mkdir } from "fs/promises";

export async function addQuickNote(req: FastifyRequest, res: FastifyReply) {
  try {
    // const part = await req.file();

    // if (!part || !part.file) {
    //   return res.status(400).send({ error: "No file uploaded" });
    // }

    // const filePath = `./uploads/${part.filename}`;
    // await new Promise((resolve, reject) => {
    //   const writeStream = fs.createWriteStream(filePath);
    //   part.file.pipe(writeStream);
    //   part.file.on("end", resolve);
    //   part.file.on("error", reject);
    // });

    // res.send({ success: true, file: filePath });

    // Create uploads directory if it doesn't exist
    await mkdir("./uploads", { recursive: true });

    // Track all files and fields
    const files: string[] = [];
    let note = "";
    let status = "";

    // Process all parts (both files and fields)
    for await (const part of req.parts()) {
      if (part.file) {
        // Handle file upload
        const filePath = `./uploads/${part.filename}`;
        await new Promise((resolve, reject) => {
          const writeStream = fs.createWriteStream(filePath);
          part.file.pipe(writeStream);
          part.file.on("end", resolve);
          part.file.on("error", reject);
        });
        files.push(filePath);
      } else {
        // Handle text fields
        if (part.fieldname === "note") note = part.value as string;
        if (part.fieldname === "status") status = part.value as string;
      }
    }

    if (files.length === 0) {
      return res.status(400).send({ error: "No file uploaded" });
    }

    res.send({
      success: true,
      files,
      note,
      status,
    });
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
}
