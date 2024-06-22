import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@api/projects";
import type { Project } from "@api/projects.types";

export function useGetProjects() {
  return useQuery<Project[], Error>(["projects"], getProjects);
}

// export function useGetProjects(filter?: string) {
//   return useQuery<Project[], Error>(
//     ["projects", filter],
//     () => getProjects(filter),
//     {
//       keepPreviousData: true,
//     },
//   );
// }
