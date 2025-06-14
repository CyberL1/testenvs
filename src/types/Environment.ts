import type { Repository } from "./Repository.ts";

export interface Environment {
  id: string;
  name: string;
  status: string;
}

export interface CreateEnvironmentBody {
  name: string;
  repositories: Repository[];
}

export interface RemoveEnvironmentQuery {
  force: string;
}
