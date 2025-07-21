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
        // Patient fields
        nfc_uid: { type: "string", nullable: true },
        blood_type: { type: "string", nullable: true },
        allergies: { type: "string", nullable: true },
        last_visit: { type: "string", format: "date-time", nullable: true },
        // Doctor fields
        department: { type: "string", nullable: true },
        license_number: { type: "string", nullable: true },
      },
      required: ["id", "name", "email", "role", "token_version", "created_at"],
    },
  },
};
