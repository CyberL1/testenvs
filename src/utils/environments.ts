import Dockerode from "dockerode";
import type { CreateEnvironmentBody } from "#src/types/Environment.ts";

const dockerode = new Dockerode();

export const createTestEnv = async ({ name }: CreateEnvironmentBody) => {
  const container = await dockerode.createContainer({
    name,
    Image: "testenvs/debian",
    Labels: {
      "testenvs.container": "true",
    },
  });

  const network = dockerode.getNetwork("testenvs-network");
  await network.connect({ Container: container.id });

  return container;
};

export const getEnvironments = () => {
  const containers = dockerode.listContainers({
    all: true,
    filters: { label: ["testenvs.container"] },
  });

  return containers;
};

export const getEnvironment = (id: string) => {
  const container = dockerode.getContainer(id);
  return container;
};

export const getEnvironmentResponse = async (
  container: Dockerode.Container,
) => {
  const inspected = await container.inspect();

  const environment = {
    id: inspected.Id,
    name: inspected.Name.slice(1),
    status: inspected.State.Status,
  };

  return environment;
};
