import fp from "fastify-plugin";
import postgres from "@fastify/postgres";

export default fp(async function (fastify, opts) {
  await fastify.register(postgres, {
    connectionString: process.env.DB_URL,
  });
  fastify.decorate("db", fastify.pg);

  fastify.addHook("onClose", async (instance) => {
    console.log("database is closing..... ");
    await fastify.pg.pool.end();
  });
});
