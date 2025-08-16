import { FastifyReply, FastifyRequest } from "fastify";

export async function insertNfcInfo(
  req: FastifyRequest<{ Body: { device_id: string; card_uid: string } }>,
  res: FastifyReply
) {
  try {
    const { device_id, card_uid } = req.body || {};
    if (!device_id || !card_uid) {
      return res
        .code(400)
        .send({ ok: false, message: "device_id and card_uid required" });
    }
    // Lookup patient by card_uid
    const patient = await req.server.sql`
      insert into nfc_logs(device_id, nfc_uid) values (${device_id}, ${card_uid})
    `;
    if (!patient) {
      return res.code(404).send({ ok: false, message: "Patient not found" });
    }
    // app.log.info({ device_id, card_uid, patient }, "received NFC scan");
    return { ok: true, patient };
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

export async function getNfcInfo(req: FastifyRequest, res: FastifyReply) {
  try {
    const nfc_logs = await req.server.sql`
    SELECT * FROM nfc_logs ORDER BY logged_at DESC LIMIT 1;
    `;
    res.send(nfc_logs);
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
}
