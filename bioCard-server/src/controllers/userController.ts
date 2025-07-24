import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";

export async function getAllUsers(req: FastifyRequest, res: FastifyReply) {
  const client = await req.server.db.connect();
  try {
    const { rows } = await client.query("SELECT id,name,email,role FROM users");
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
      "SELECT id, email, password, name, role FROM users where email = $1",
      [email]
    );
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: "Invalied credentials" });
    }

    const token = req.server.jwt.sign(
      { uuid: user.id, name: user.name, role: user.role, email: user.email },
      {
        expiresIn: "5m",
      }
    );
    res.setCookie("session_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 5,
    });

    res.send({
      uuid: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal server Error" });
  } finally {
    client.release();
  }
}

export async function logoutUser(req: FastifyRequest, res: FastifyReply) {
  res.clearCookie("session_token", { path: "/" });
  res.send({ message: "Logout Successful", success: true }).status(200);
}

export async function getProfile(req: FastifyRequest, res: FastifyReply) {
  try {
    if (!req.user) {
      return res.status(401).send({ error: "Not authenticated" });
    }
    const { uuid, name, email, role } = req.user as {
      uuid: string;
      name: string;
      email: string;
      role: string;
    };
    res.send({ uuid, name, email, role });
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server error" });
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
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  console.log(req.user);
  const { id } = req.params;
  const client = await req.server.db.connect();
  try {
    // const result = await client.query("SELECT * FROM users WHERE id = $1", [
    //   id,
    // ]);
    const result = await client.query(
      `SELECT
    u.*,
    p.nfc_uid,
    p.blood_type,
    p.allergies,
    p.last_visit,
    d.department,
    d.license_number
    FROM users u
    LEFT JOIN patients p ON u.id = p.user_id
    LEFT JOIN doctors d ON u.id = d.user_id
    WHERE u.id = $1`,
      [id]
    );
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

export async function addAdminUser(req: FastifyRequest, res: FastifyReply) {
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
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, 'admin')",
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
