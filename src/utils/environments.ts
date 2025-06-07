import Dockerode from "dockerode";
import type { CreateEnvironmentBody } from "#src/types/Environment.ts";

const dockerode = new Dockerode();

export const createTestEnv = ({ name }: CreateEnvironmentBody) => {
  const container = dockerode.createContainer({
    name,
    Image: "alpine",
    Labels: {
      "testenvs.container": "true",
    },
  });

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
