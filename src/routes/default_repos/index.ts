import { readFileSync } from "fs";

export const methods = {
  get: () => {
    const defaultRepos = readFileSync("data/default_repos.json", "utf-8");
    return JSON.parse(defaultRepos);
  },
};
