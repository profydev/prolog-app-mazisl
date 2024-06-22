import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues } from "@api/issues";
import type { Page } from "@typings/page.types";
import type { Issue } from "@api/issues.types";

const QUERY_KEY = "issues";

// export function getQueryKey(page?: number) {
//   if (page === undefined) {
//     return [QUERY_KEY];
//   }
//   return [QUERY_KEY, page];
// }

// export function useGetIssues(page: number) {
//   const query = useQuery<Page<Issue>, Error>(
//     getQueryKey(page),
//     ({ signal }) => getIssues(page, { signal }),
//     { keepPreviousData: true },
//   );

// Prefetch the next page!
//   const queryClient = useQueryClient();
//   useEffect(() => {
//     if (query.data?.meta.hasNextPage) {
//       queryClient.prefetchQuery(getQueryKey(page + 1), ({ signal }) =>
//         getIssues(page + 1, { signal }),
//       );
//     }
//   }, [query.data, page, queryClient]);
//   return query;
// }

export function getQueryKey(
  page?: number,
  statusFilter?: string | null,
  levelFilter?: string | null,
  searchQuery?: string | null,
) {
  if (page === undefined) {
    return [QUERY_KEY];
  }
  return [QUERY_KEY, page, statusFilter, levelFilter, searchQuery];
}

export function useGetIssues(
  page: number,
  statusFilter: "resolved" | "unresolved" | null,
  levelFilter: "error" | "warning" | "info" | null,
  searchQuery?: string | null,
) {
  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(page, statusFilter, levelFilter, searchQuery),
    ({ signal }) =>
      getIssues(page, statusFilter, levelFilter, searchQuery || undefined, {
        signal,
      }),
    { keepPreviousData: true },
  );

  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(
        getQueryKey(page + 1, statusFilter, levelFilter, searchQuery),
        ({ signal }) =>
          getIssues(
            page + 1,
            statusFilter,
            levelFilter,
            searchQuery || undefined,
            { signal },
          ),
      );
    }
  }, [query.data, page, statusFilter, levelFilter, searchQuery, queryClient]);
  return query;
}
