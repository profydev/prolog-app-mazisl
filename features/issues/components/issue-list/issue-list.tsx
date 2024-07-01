import { NextRouter, useRouter } from "next/router";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "@features/issues";
import { IssueRow } from "./issue-row";
import styles from "./issue-list.module.scss";
import { IssueLevel, IssueListParams, IssueStatus } from "@api/issues.types";
// import { useState } from "react";
import { Select, SearchInput } from "@features/ui";

import { z } from "zod";

const statusOptions = [
  { label: "Resolved", value: IssueStatus.resolved },
  { label: "Unresolved", value: IssueStatus.open },
];

const levelOptions = [
  { label: "Error", value: IssueLevel.error },
  { label: "Warning", value: IssueLevel.warning },
  { label: "Info", value: IssueLevel.info },
];

const QueryParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((str) => Number(str) || 1),
  status: z.nativeEnum(IssueStatus).optional(),
  level: z.nativeEnum(IssueLevel).optional(),
  project: z.string().optional(),
});

function parseQueryParams(query: NextRouter["query"]) {
  const parsed = QueryParamsSchema.safeParse(query);
  if (!parsed.success) {
    console.error(parsed.error);
    return { page: 1 };
  }
  return parsed.data;
}

export function IssueList() {
  // const [searchValue, setSearchValue] = useState<string>("");

  const router = useRouter();
  const queryParams = parseQueryParams(router.query);
  const issuesPage = useGetIssues(queryParams);
  const projects = useGetProjects();

  const navigateToPage = (newPage: number) =>
    router.push({
      pathname: router.pathname,
      query: { ...queryParams, page: newPage },
    });

  const updateFilter = (filters: Partial<IssueListParams>) =>
    router.push({
      pathname: router.pathname,
      query: { ...queryParams, ...filters },
    });

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

  const { items, meta } = issuesPage.data || {};

  return (
    <>
      <div className={styles.filters}>
        <Select
          label="Status Filter"
          placeholder="Status"
          options={statusOptions}
          onChange={(value) => {
            router.push({
              pathname: router.pathname,
              query: { ...queryParams, status: value.toLocaleLowerCase() },
            });
          }}
        />

        <Select
          label="Level Filter"
          placeholder="Level"
          options={levelOptions}
          onChange={(value) => {
            router.push({
              pathname: router.pathname,
              query: { ...queryParams, level: value.toLocaleLowerCase() },
            });
          }}
        />

        <SearchInput
          label="Search Project"
          searchValue={queryParams.project || ""}
          handleSearchChange={(e) => updateFilter({ project: e.target.value })}
          placeholder="Search..."
          disabled={false}
        />
      </div>

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

          <tbody>
            {(items || []).map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                projectLanguage={projectIdToLanguage[issue.projectId]}
              />
            ))}
          </tbody>
        </table>

        <div className={styles.paginationContainer}>
          <div>
            <button
              className={styles.paginationButton}
              onClick={() => navigateToPage(queryParams.page - 1)}
              disabled={queryParams.page === 1}
            >
              Previous
            </button>
            <button
              className={styles.paginationButton}
              onClick={() => navigateToPage(queryParams.page + 1)}
              disabled={queryParams.page === meta?.totalPages}
            >
              Next
            </button>
          </div>
          <div className={styles.pageInfo}>
            Page <span className={styles.pageNumber}>{meta?.currentPage}</span>{" "}
            of <span className={styles.pageNumber}>{meta?.totalPages}</span>
          </div>
        </div>
      </div>
    </>
  );
}
