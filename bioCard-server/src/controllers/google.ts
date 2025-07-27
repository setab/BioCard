import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
  "81172239472-8fe52n8l3hr1shmvdkurldfa3lndmjof.apps.googleusercontent.com",
  "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"
);

const verify_google_user = async (id_token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: id_token,
    audience: [
      "81172239472-8fe52n8l3hr1shmvdkurldfa3lndmjof.apps.googleusercontent.com",
    ],
  });
  return ticket.getPayload();
};
