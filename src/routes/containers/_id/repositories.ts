import type { Environment } from "#src/types/Environment.ts";
import { getEnvironmentRepositories } from "#src/utils/environments.ts";
import type { FastifyRequest } from "fastify";

export const methods = {
  get: async (req: FastifyRequest<{ Params: Environment }>) => {
    const repositories = await getEnvironmentRepositories(req.params.id);
    return repositories;
  },
};
