import { axios } from "./axios";
import type { Issue, IssueListParams } from "./issues.types";
import type { Page } from "@typings/page.types";
// import type { Project } from "./projects.types";

const ENDPOINT = "/issue";
// const PROJECT_ENDPOINT = "/project";

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

// export async function getIssues(
//   page: number,
//   statusFilter: "resolved" | "unresolved" | null,
//   levelFilter: "error" | "warning" | "info" | null,
//   searchQuery?: string,
//   options?: { signal?: AbortSignal },
// ): Promise<Page<Issue>> {
//   const params: {
//     page: number;
//     status?: string;
//     level?: string;
//     projectId?: string;
//   } = { page };

//   if (statusFilter) {
//     params.status = statusFilter === "unresolved" ? "open" : statusFilter;
//   }

//   if (levelFilter) {
//     params.level = levelFilter;
//   }

//   if (searchQuery) {
//     const { data: projects } = await axios.get<Project[]>(PROJECT_ENDPOINT);
//     const matchingProject = projects.find((project) =>
//       project.name.toLowerCase().includes(searchQuery.toLowerCase()),
//     );
//     if (matchingProject) {
//       params.projectId = matchingProject.id;
//     } else {
//       If no matching project, return an empty result
//       return {
//         items: [],
//         meta: {
//           totalPages: 0,
//           currentPage: page,
//           limit: 10,
//           totalItems: 0,
//           hasPreviousPage: false,
//           hasNextPage: false,
//         },
//       };
//     }
//   }

//   const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
//     params,
//     signal: options?.signal,
//   });
//   return data;
// }
