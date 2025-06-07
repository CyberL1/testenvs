import type { Environment } from "#src/types/Environment.ts";
import { getEnvironment } from "#src/utils/environments.ts";
import type { FastifyRequest } from "fastify";

export const methods = {
  put: async (req: FastifyRequest<{ Params: Environment }>) => {
    const container = getEnvironment(req.params.id);

    await container.start();
    return container;
  },
};
