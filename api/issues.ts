import { axios } from "./axios";
import type { Issue } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";

// export async function getIssues(
//   page: number,
//   options?: { signal?: AbortSignal },
// ) {
//   const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
//     params: { page },
//     signal: options?.signal,
//   });
//   return data;
// }

export async function getIssues(
  page: number,
  statusFilter: "resolved" | "unresolved" | null,
  levelFilter: "error" | "warning" | "info" | null,
  options?: { signal?: AbortSignal },
) {
  const params: { page: number; status?: string; level?: string } = { page };

  if (statusFilter) {
    params.status = statusFilter === "unresolved" ? "open" : statusFilter;
  }

  if (levelFilter) {
    params.level = levelFilter;
  }

  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params,
    signal: options?.signal,
  });
  return data;
}
