import { axios } from "./axios";
import type { Issue, IssueListParams } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";

export async function getIssues(
  params: IssueListParams,
  options?: { signal?: AbortSignal },
) {
  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params,
    signal: options?.signal,
  });
  return data;
}
