import type { Environment } from "#src/types/Environment.ts";
import { getEnvironment } from "#src/utils/environments.ts";
import type { FastifyRequest } from "fastify";

export const methods = {
  get: async (req: FastifyRequest<{ Params: Environment }>, reply) => {
    const container = getEnvironment(req.params.id);

    reply.header("Content-Type", "text/event-stream");
    reply.header("Cache-Control", "no-cache");
    reply.header("Connection", "keep-alive");

    const stream = await container.stats({ stream: true });

    if (!stream) {
      reply.status(500).send("Error fetching stats");
      return;
    }
    stream.on("data", (chunk) => {
      reply.raw.write(`data: ${chunk.toString()}\n\n`);
    });

    stream.on("end", () => reply.raw.end());
    return stream;
  },
};
