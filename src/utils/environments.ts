import Dockerode from "dockerode";
import type { CreateEnvironmentBody } from "#src/types/Environment.ts";

const dockerode = new Dockerode();

export const createTestEnv = ({ name }: CreateEnvironmentBody) => {
  const container = dockerode.createContainer({
    name,
    Image: "testenvs/debian",
    Labels: {
      "testenvs.container": "true",
    },
    ExposedPorts: {
      "22": {},
    },
    HostConfig: {
      PortBindings: {
        "22": [
          {
            HostPort: "12345",
          },
        ],
      },
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
