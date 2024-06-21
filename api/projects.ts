import { axios } from "./axios";
import type { Project } from "./projects.types";

const ENDPOINT = "/project";

// export async function getProjects() {
//   const { data } = await axios.get<Project[]>(ENDPOINT);
//   return data;
// }

export async function getProjects(filter?: string) {
  const { data } = await axios.get<Project[]>(ENDPOINT);

  if (filter) {
    const lowercasedFilter = filter.toLowerCase();
    return data.filter((project) =>
      project.name.toLowerCase().includes(lowercasedFilter),
    );
  }

  return data;
}
