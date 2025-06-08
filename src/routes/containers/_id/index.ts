import type {
  Environment,
  RemoveEnvironmentQuery,
} from "#src/types/Environment.ts";
import {
  getEnvironment,
  getEnvironmentResponse,
} from "#src/utils/environments.ts";
import type { FastifyRequest } from "fastify";

export const methods = {
  get: (req: FastifyRequest<{ Params: Environment }>) => {
    const container = getEnvironment(req.params.id);
    return getEnvironmentResponse(container);
  },

  delete: async (
    req: FastifyRequest<{
      Params: Environment;
      Querystring: RemoveEnvironmentQuery;
    }>,
  ) => {
    const container = getEnvironment(req.params.id);

    await container.remove({ force: req.query.force === "true" });
    return getEnvironmentResponse(container);
  },
};
