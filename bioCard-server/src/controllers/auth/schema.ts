export const signinGoogleParamSchema = {
  type: "object",
  properties: {
    id_token: {
      type: "string",
      errorMessage: "ID Token should be a string",
    },
  },
  required: ["id_token"],
  additionalProperties: false,
  errorMessage: {
    required: {
      id_token: "Id token is required.",
    },
    additionalProperties:
      "Should not have properties other than the specified fields",
  },
} as const; // dont forget to put const on here for type

export const signinGoogleSchema = {
  body: signinGoogleParamSchema,
} as const;
