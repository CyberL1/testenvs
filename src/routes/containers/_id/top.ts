import type { Environment } from "#src/types/Environment.ts";
import { getEnvironment } from "#src/utils/environments.ts";
import type { FastifyRequest } from "fastify";

export const methods = {
  get: async (req: FastifyRequest<{ Params: Environment }>) => {
    const container = getEnvironment(req.params.id);
    const { Processes } = await container.top();

    return Processes;
  },
};
