import { CreateEnvironmentSchema } from "#src/schemas/CreateEnvironmentSchema.ts";
import type {
  CreateEnvironmentBody,
  Environment,
} from "#src/types/Environment.ts";
import type { RouteMethods } from "#src/types/Route.ts";
import { createTestEnv, deleteTestEnv } from "#src/utils/environments.ts";
import type { FastifyRequest } from "fastify";

export const methods: RouteMethods = {
  post: {
    schema: CreateEnvironmentSchema,
    handler: async (
      req: FastifyRequest<{
        Params: Environment;
        Body: CreateEnvironmentBody;
      }>,
    ) => {
      await deleteTestEnv(req.params.id);

      const container = await createTestEnv({
        name: req.body.name,
        repositories: req.body.repositories,
      });

      return container;
    },
  },
};
