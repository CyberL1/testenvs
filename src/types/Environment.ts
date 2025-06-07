import type { Repository } from "./Repository.ts";

export interface Environment {
  id: string;
  name: string;
  status: string;
  ip: string;
}

export interface CreateEnvironmentBody {
  name: string;
  repositories: Repository[];
}

export interface RemoveEnvironmentParams {
  force: boolean;
}

export interface RemoveEnvironmentQuery {
  force: string;
}
