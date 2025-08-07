import Fastify from "fastify";
import userRoute from "./src/routes/user.js";
import patientRoute from "./src/routes/appointment.js";
import medicalRecordRoute from "./src/routes/medicalRecord.js";
import dbPlugin from "./src/plugins/db.js";
import jwtPlugin from "./src/plugins/jwt.js";
import { logRequest } from "./src/hooks/onRequest.js";
import { env, isDevelopment } from "./src/config/env.js";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import staticPlugin from "./src/plugins/static.js";
import quickNoteRoute from "./src/routes/quickNoteRoute.js";
import multiPlugin from "./src/plugins/multi.js";

const app = Fastify({
  logger: isDevelopment,
}).withTypeProvider<ZodTypeProvider>();

// Register CORS first
app.register(cors, {
  origin: "http://localhost:5173",
  credentials: true,
});
app.register(staticPlugin);
// Then register other plugins
app.register(fastifyCookie);
app.register(jwtPlugin);
app.register(dbPlugin);
app.register(multiPlugin);

// app.register(fastifyStatic, {
//   root: path.join(__dirname, "../../uploads"),
//   prefix: "/uploads/",
// });
app.register(userRoute);
app.register(patientRoute);
app.register(medicalRecordRoute);
app.register(quickNoteRoute);
app.addHook("onRequest", logRequest);

app.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

app.get(
  "/test",
  {
    onRequest: [logRequest],
  },
  async function (req, res) {
    const result = await req.server.sql`
      select * from users
    `;
    res.send({ message: "this is test file ", result });
  }
);

const start = async () => {
  try {
    await app.listen({
      port: env.PORT,
      host: env.HOST,
    });
    console.log(`🚀 Server is listening at http://${env.HOST}:${env.PORT}`);
    console.log(`📝 Environment: ${env.NODE_ENV}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

// Graceful shutdown on Ctrl+C
process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down...");
  await app.close();
  process.exit(0);
});
