import Dockerode from "dockerode";
import type { CreateEnvironmentBody } from "#src/types/Environment.ts";

const dockerode = new Dockerode();

export const createTestEnv = async (
  { name, repositories }: CreateEnvironmentBody,
) => {
  const container = await dockerode.createContainer({
    name,
    Image: "testenvs/debian",
    Labels: {
      "testenvs.container": "true",
    },
  });

  await container.start();

  const repos = repositories.map((repo) => `${repo.url} ${repo.branch}`).join(
    "\n",
  );

  const exec = await container.exec({
    Cmd: ["sh", "-c", `echo '${repos}' > .repos`],
    AttachStdout: true,
    AttachStderr: true,
  });

  await exec.start({});

  const network = dockerode.getNetwork("testenvs_default");
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

export const getEnvironmentRepositories = async (id: string) => {
  const container = dockerode.getContainer(id);

  const exec = await container.exec({
    Cmd: ["cat", ".repos"],
    AttachStdout: true,
    AttachStderr: true,
  });

  const stream = await exec.start({});

  let output = "";
  await new Promise<void>((resolve, reject) => {
    stream.on("data", (data: Buffer) => {
      output += data.toString();
    });
    stream.on("end", resolve);
    stream.on("error", reject);
  });

  const repositories = output.split("\n").filter(Boolean).map((line) => {
    // Remove any weird encoding or non-printable characters
    const cleanLine = line.replace(/[^\x20-\x7E]+/g, "");

    const [url, branch] = cleanLine.split(" ");
    return { url, branch };
  });

  return repositories;
};
