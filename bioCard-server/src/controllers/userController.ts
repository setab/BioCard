import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";

export async function getAllUsers(req: FastifyRequest, res: FastifyReply) {
  const client = await req.server.db.connect();
  try {
    const { rows } = await client.query("SELECT * FROM users");
    res.send(rows);
  } finally {
    client.release();
  }
}

export async function loginUser(req: FastifyRequest, res: FastifyReply) {
  const { email, password } = req.body as { email: string; password: string };
  const client = await req.server.db.connect();

  try {
    const result = await client.query(
      "SELECT id, email, password FROM users where email = $1",
      [email]
    );
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: "Invalied credentials" });
    }

    const token = req.server.jwt.sign(
      { id: user.id, email: user.email },
      {
        expiresIn: "5m",
      }
    );

    res.send({ token });
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal server Error" });
  } finally {
    client.release();
  }
}

export async function signinUser(req: FastifyRequest, res: FastifyReply) {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };
  const client = await req.server.db.connect();
  try {
    const exist = await client.query(
      "SELECT name, email FROM users WHERE name = $1 OR email = $2",
      [name, email]
    );
    if (exist.rows.length > 0) {
      return res.status(409).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await client.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, 'patient')",
      [name, email, hashedPassword]
    );
    res.code(201).send({ success: true });
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
}

export async function getUserById(
  req: FastifyRequest<{ Params: { name: string } }>,
  res: FastifyReply
) {
  const { name } = req.params;
  const client = await req.server.db.connect();
  try {
    const result = await client.query("SELECT * FROM users WHERE name = $1", [
      name,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(result.rows[0]);
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal server error" });
  } finally {
    client.release();
  }
}
