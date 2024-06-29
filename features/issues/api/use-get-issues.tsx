import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import type { Issue, IssueListParams } from "@api/issues.types";

const QUERY_KEY = "issues";

export function getQueryKey(params: IssueListParams) {
  return [QUERY_KEY, ...Object.values(params)];
}

export function useGetIssues(params: IssueListParams) {
  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(params),
    ({ signal }) => getIssues(params, { signal }),
    { keepPreviousData: true },
  );

  const queryClient = useQueryClient();

  const paramsJson = JSON.stringify(params);

  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      const nextPageParams: IssueListParams = JSON.parse(paramsJson);
      nextPageParams.page += 1;
      queryClient.prefetchQuery(getQueryKey(nextPageParams), ({ signal }) =>
        getIssues(nextPageParams, { signal }),
      );
    }
  }, [query.data, paramsJson, queryClient]);

  return query;
}

// export function getQueryKey(
//   page?: number,
//   statusFilter?: string | null,
//   levelFilter?: string | null,
//   searchQuery?: string | null,
// ) {
//   if (page === undefined) {
//     return [QUERY_KEY];
//   }
//   return [QUERY_KEY, page, statusFilter, levelFilter, searchQuery];
// }

// export function useGetIssues(
//   page: number,
//   statusFilter: "resolved" | "unresolved" | null,
//   levelFilter: "error" | "warning" | "info" | null,
//   searchQuery?: string | null,
// ) {
//   const query = useQuery<Page<Issue>, Error>(
//     getQueryKey(page, statusFilter, levelFilter, searchQuery),
//     ({ signal }) =>
//       getIssues(page, statusFilter, levelFilter, searchQuery || undefined, {
//         signal,
//       }),
//     { keepPreviousData: true },
//   );

//   const queryClient = useQueryClient();
//   useEffect(() => {
//     if (query.data?.meta.hasNextPage) {
//       queryClient.prefetchQuery(
//         getQueryKey(page + 1, statusFilter, levelFilter, searchQuery),
//         ({ signal }) =>
//           getIssues(
//             page + 1,
//             statusFilter,
//             levelFilter,
//             searchQuery || undefined,
//             { signal },
//           ),
//       );
//     }
//   }, [query.data, page, statusFilter, levelFilter, searchQuery, queryClient]);
//   return query;
// }
