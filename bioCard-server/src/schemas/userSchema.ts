export const createUserSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        role: { type: "string" },
        token_version: { type: "number" },
        created_at: { type: "string", format: "date-time" },
      },
      required: ["id", "name", "email", "role", "token_version", "created_at"],
    },
  },
};
