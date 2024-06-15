import { useRouter } from "next/router";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { IssueRow } from "./issue-row";
import styles from "./issue-list.module.scss";
import { useIssueFilter } from "./use-issue-filter";
import type { Project } from "@api/projects.types";

// import type { PageMeta } from "@typings/page.types";
// import type { Page } from "@typings/page.types";
// import type { Issue } from "@api/issues.types";
// import type { UseQueryResult } from '@tanstack/react-query';

export function IssueList() {
  const router = useRouter();
  const { query } = router;
  const page = Number(query.page || 1);

  const { statusFilter, levelFilter, showIssues, searchInput, setPage } =
    useIssueFilter();

  const issuesPage = useGetIssues(page);
  const projects = useGetProjects();

  const data: Project[] = projects.data || [];

  if (projects.isLoading || issuesPage.isLoading) {
    return <div>Loading</div>;
  }

  if (projects.isError) {
    console.error(projects.error);
    return <div>Error loading projects: {projects.error.message}</div>;
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return <div>Error loading issues: {issuesPage.error.message}</div>;
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>,
  );

  const { meta } = issuesPage.data || {};

  const matchingProjects = data.filter((project) =>
    project.name.toLowerCase().includes(searchInput),
  );

  const matchingProjectIds = matchingProjects.map((project) => project.id);

  const filteredProjects = showIssues.filter((item) =>
    matchingProjectIds.includes(item.projectId),
  );

  const navigateToPage = (newPage: number) => {
    setPage(newPage); // Update the page state in the context
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...query,
          page: newPage,
          statusFilter: statusFilter || undefined,
          levelFilter: levelFilter || undefined,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>Issue</th>
            <th className={styles.headerCell}>Level</th>
            <th className={styles.headerCell}>Events</th>
            <th className={styles.headerCell}>Users</th>
          </tr>
        </thead>

        {searchInput ? (
          <tbody>
            {(filteredProjects || []).map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                projectLanguage={projectIdToLanguage[issue.projectId]}
              />
            ))}
          </tbody>
        ) : (
          <tbody>
            {(showIssues || []).map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                projectLanguage={projectIdToLanguage[issue.projectId]}
              />
            ))}
          </tbody>
        )}
      </table>

      <div className={styles.paginationContainer}>
        <div>
          <button
            className={styles.paginationButton}
            onClick={() => navigateToPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className={styles.paginationButton}
            onClick={() => navigateToPage(page + 1)}
            disabled={page === meta?.totalPages}
          >
            Next
          </button>
        </div>
        <div className={styles.pageInfo}>
          Page <span className={styles.pageNumber}>{meta?.currentPage}</span> of{" "}
          <span className={styles.pageNumber}>{meta?.totalPages}</span>
        </div>
      </div>
    </div>
  );
}
