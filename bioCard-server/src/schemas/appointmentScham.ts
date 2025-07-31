export const getPatientAppointmentsByIdSchema = {
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
          appointment_time: { type: "string", format: "date-time" },
          reason: { type: "string", nullable: true },
          status: { type: "string" },
          notes: { type: "string", nullable: true },
          created_at: { type: "string", format: "date-time" },
          department: { type: "string", nullable: true },
          license_number: { type: "string", nullable: true },
          doctor_name: { type: "string" }, // doctor's name from users table
        },
        required: [
          "id",
          "patient_id",
          "doctor_id",
          "appointment_time",
          "status",
          "created_at",
          "department",
          "license_number",
          "doctor_name",
        ],
      },
    },
  },
};
