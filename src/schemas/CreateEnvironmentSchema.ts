import type { FastifySchema } from "fastify";

export const CreateEnvironmentSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string", minLength: 1 },
      repositories: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          properties: {
            url: { type: "string", minLength: 1 },
            branch: { type: "string", minLength: 1 },
          },
          required: ["url", "branch"],
        },
      },
    },
    required: ["name", "repositories"],
  },
};
