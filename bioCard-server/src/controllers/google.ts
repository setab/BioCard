import { FastifyReply, FastifyRequest } from "fastify";
import { OAuth2Client } from "google-auth-library";
import { FromSchema } from "json-schema-to-ts";
// import { signinGoogleBodySchema, SigninGoogleBody } from "./auth/schema";
import { signinGoogleParamSchema } from "./auth/schema";

const client = new OAuth2Client(
  process.env.GOOGLE_AUTH_WEB_CLIENT_ID,
  process.env.GOOGLE_AUTH_CLIENT_SECRET
);

const verify_google_user = async (id_token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: id_token,
    audience: [process.env.GOOGLE_AUTH_WEB_CLIENT_ID ?? ""],
  });
  return ticket.getPayload();
};

export async function GoogleSignInController(
  req: FastifyRequest<{
    Body: FromSchema<typeof signinGoogleParamSchema>;
  }>,
  res: FastifyReply
) {
  try {
    const googleUser = await verify_google_user(req.body.id_token);
    if (!googleUser) {
      return res.status(400).send({
        error: "Invalid Google ID token",
      });
    }
    const { session_token, userProfile } = await req.server.sql.begin(
      async (sql) => {
        // Find existing user
        const [existingUser] = await sql<
          { id: string; name: string; email: string; role: string }[]
        >`select id, name, email, role, created_at from users where email = ${
          googleUser.email as string
        } limit 1`;

        let userId = existingUser?.id;

        // If user does not exist, create user first
        if (!userId) {
          const [newUser] = await sql<
            { id: string }[]
          >`insert into users (name, email, role) values (${
            googleUser.name as string
          }, ${googleUser.email as string}, 'patient') returning id`;
          userId = newUser.id;

          // Then create patient record
          await sql`
            insert into patients (user_id, nfc_uid, blood_type)
            values (${userId}, ${`GOOGLE_${userId.slice(0, 8)}`}, NULL)
          `;
        }

        // Insert/update Google account info
        await sql`
          insert into accounts (user_id, provider, provider_account_id, id_token, expires_at)
          values (${userId}, 'Google', ${googleUser.sub}, ${req.body.id_token}, ${googleUser.exp})
          on conflict (user_id, provider)
          do update set
            provider_account_id = EXCLUDED.provider_account_id,
            id_token = EXCLUDED.id_token,
            expires_at = EXCLUDED.expires_at,
            updated_at = current_timestamp
        `;

        const sessionMaxAge = 60 * 60 * 24 * 15;
        const sessionToken = await req.server.jwt.sign(
          {
            uuid: userId,
            name: googleUser.name,
            email: googleUser.email,
            role: "patient",
          },
          { expiresIn: sessionMaxAge }
        );

        await sql`
          insert into sessions (user_id, token, expires)
          values (${userId}, ${sessionToken}, ${new Date(
          Date.now() + sessionMaxAge * 1000
        )})
        `;

        return {
          session_token: sessionToken,
          userProfile: existingUser || {
            id: userId,
            name: googleUser.name,
            email: googleUser.email,
            role: "patient",
          },
        };
      }
    );
    res.setCookie("session_token", session_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 15, // 15 days
    });

    res
      .send({
        code: "SUCCESS",
        message: "Google Sign-in successful",
        data: {
          uuid: userProfile.id,
          email: userProfile.email,
          name: userProfile.name,
          role: userProfile.role,
        },
      })
      .code(200);
  } catch (error: unknown) {
    req.server.log.error(error);
    res.status(500).send({
      statusCode: 500,
      code: "ServerFailed",
      message: "An internal server error has occurred.",
      error,
    });
  }
}
