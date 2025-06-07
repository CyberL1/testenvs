import { CreateEnvironmentSchema } from "#src/schemas/CreateEnvironmentSchema.ts";
import type {
  CreateEnvironmentBody,
  Environment,
} from "#src/types/Environment.ts";
import type { RouteMethods } from "#src/types/Route.ts";
import { createTestEnv, getEnvironments } from "#src/utils/environments.ts";
import type { FastifyRequest } from "fastify";

export const methods: RouteMethods = {
  get: async () => {
    const containers = await getEnvironments();
    const containersResponse = [];

    for (const container of containers) {
      const response = {
        id: container.Id,
        name: container.Names[0].slice(1),
        status: container.State,
      } as Environment;

      containersResponse.push(response);
    }

    return containersResponse;
  },

  post: {
    schema: CreateEnvironmentSchema,
    handler: async (req: FastifyRequest<{ Body: CreateEnvironmentBody }>) => {
      const container = await createTestEnv({
        name: req.body.name,
        repositories: req.body.repositories,
      });

      return container;
    },
  },
};
