import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";

// Use req.server.sql for all queries!

export async function getAllUsers(req: FastifyRequest, res: FastifyReply) {
  try {
    const users = await req.server.sql`
      SELECT id, name, email, role FROM users
    `;
    res.send(users);
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server error" });
  }
}

export async function loginUser(req: FastifyRequest, res: FastifyReply) {
  const { email, password } = req.body as { email: string; password: string };

  try {
    const result = await req.server.sql`
      SELECT id, email, password, name, role FROM users WHERE email = ${email}
    `;
    const user = result[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const token = req.server.jwt.sign(
      { uuid: user.id, name: user.name, role: user.role, email: user.email },
      { expiresIn: "5m" }
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
  }
}

export async function logoutUser(req: FastifyRequest, res: FastifyReply) {
  res.clearCookie("session_token", { path: "/" });
  res.status(200).send({ message: "Logout Successful", success: true });
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
    console.log(`role: ${role}, uuid: ${uuid}, name: ${name}, email: ${email}`);
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
  try {
    const exist = await req.server.sql`
      SELECT name, email FROM users WHERE name = ${name} OR email = ${email}
    `;
    if (exist.length > 0) {
      return res.status(409).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await req.server.sql`
      INSERT INTO users (name, email, password, role)
      VALUES (${name}, ${email}, ${hashedPassword}, 'patient')
    `;
    res.code(201).send({ success: true });
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

export async function getUserById(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  console.log(req.user);
  const { id } = req.params;
  try {
    const result = await req.server.sql`
      SELECT
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
      WHERE u.id = ${id}
    `;
    if (result.length === 0) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(result[0]);
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
}

export async function addAdminUser(req: FastifyRequest, res: FastifyReply) {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };
  try {
    const exist = await req.server.sql`
      SELECT name, email FROM users WHERE name = ${name} OR email = ${email}
    `;
    if (exist.length > 0) {
      return res.status(409).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await req.server.sql`
      INSERT INTO users (name, email, password, role)
      VALUES (${name}, ${email}, ${hashedPassword}, 'admin')
    `;
    res.code(201).send({ success: true });
  } catch (err) {
    req.server.log.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
}
