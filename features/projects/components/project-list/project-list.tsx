import { ProjectCard } from "../project-card";
import { useGetProjects } from "../../api/use-get-projects";
import { LoadingSpinner } from "../loading-spinner/loading-file";
import { ErrorDisplay } from "../error-display/error-display";
import styles from "./project-list.module.scss";

export function ProjectList() {
  const { data, isLoading, isError, error } = useGetProjects();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <div>
        <ErrorDisplay />
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
