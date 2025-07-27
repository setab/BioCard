import fp from "fastify-plugin";
// import postgres from "@fastify/postgres";
import postgres from "postgres";
// import { env } from "../config/env";

export default fp(async function (fastify, opts) {
  // await fastify.register(postgres, {
  //   connectionString: process.env.DB_URL,
  // });
  // fastify.decorate("db", fastify.pg);

  // fastify.addHook("onClose", async (instance) => {
  //   console.log("database is closing..... ");
  //   await fastify.pg.pool.end();
  // });

  const sql = postgres({
    host: process.env.HOST,
    port: Number(process.env.PGPORT) || 5432,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    // ssl: 'require', // Uncomment if using SSL
  });
  fastify.decorate("sql", sql);
  fastify.addHook("onClose", async () => {
    await sql.end();
  });
});
