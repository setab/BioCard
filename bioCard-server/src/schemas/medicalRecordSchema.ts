export const getMedicalRecordSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          patient_id: { type: "string" },
          doctor_id: { type: "string" },
          diagnosis: { type: "string" },
          notes: { type: ["string", "null"] },
          prescriptions: { type: ["string", "null"] },
          procedures: { type: ["string", "null"] },
          follow_up: { type: ["string", "null"], format: "date-time" },
          images: { type: ["array", "null"], items: { type: "string" } },
          created_at: { type: "string", format: "date-time" },
          date: { type: "string", format: "date-time" },
          // doctor_name: { type: "string" }, // doctor's name from users table
        },
        required: [
          "id",
          "patient_id",
          "doctor_id",
          "diagnosis",
          "created_at",
          "date",
          // "doctor_name",
        ],
      },
    },
  },
};

export const getMedicalRecordByIdSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          patient_id: { type: "string" },
          doctor_id: { type: "string" },
          diagnosis: { type: "string" },
          notes: { type: ["string", "null"] },
          prescriptions: { type: ["string", "null"] },
          procedures: { type: ["string", "null"] },
          follow_up: { type: ["string", "null"], format: "date-time" },
          images: { type: ["array", "null"], items: { type: "string" } },
          created_at: { type: "string", format: "date-time" },
          date: { type: "string", format: "date-time" },
          doctor_name: { type: "string" }, // doctor's name from users table
        },
        required: [
          "id",
          "patient_id",
          "doctor_id",
          "diagnosis",
          "created_at",
          "date",
          "doctor_name",
        ],
      },
    },
  },
};
