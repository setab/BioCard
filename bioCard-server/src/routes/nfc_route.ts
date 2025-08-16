import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getNfcInfo, insertNfcInfo } from "../controllers/nfc.js";

async function nfc_route(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  fastify.post("/biocard/scan", insertNfcInfo);
  fastify.get("/biocard/scan", getNfcInfo);
}
export default nfc_route;
