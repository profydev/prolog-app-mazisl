import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import { useRouter } from "next/router";
import { useGetIssues } from "../../api/use-get-issues";
import type { Issue } from "@api/issues.types";

export type TStatusFilter = null | "resolved" | "unresolved";
export type TLevelFilter = null | "error" | "warning" | "info";
export type TIssuesList =
  | "all"
  | "resolved"
  | "unresolved"
  | "error"
  | "warning"
  | "info"
  | "resolvedError"
  | "resolvedWarning"
  | "resolvedInfo"
  | "unresolvedError"
  | "unresolvedWarning"
  | "unresolvedInfo";

type TIssueFilterProvider = {
  statusFilter: TStatusFilter;
  levelFilter: TLevelFilter;
  handleStatusFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLevelFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  issuesList: string;
  setIssuesList: Dispatch<SetStateAction<TIssuesList>>;
  showIssues: Issue[];
  searchInput: string;
};

const IssueFilterContext = createContext<TIssueFilterProvider>(
  {} as TIssueFilterProvider,
);

export const IssueFilterProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { query } = router;

  const getStatusFilterFromQuery = (
    queryParam: string | string[] | undefined,
  ): TStatusFilter => {
    if (
      typeof queryParam === "string" &&
      (queryParam === "resolved" || queryParam === "unresolved")
    ) {
      return queryParam;
    }
    return null;
  };

  const getLevelFilterFromQuery = (
    queryParam: string | string[] | undefined,
  ): TLevelFilter => {
    if (
      typeof queryParam === "string" &&
      (queryParam === "error" ||
        queryParam === "warning" ||
        queryParam === "info")
    ) {
      return queryParam;
    }
    return null;
  };

  const [statusFilter, setStatusFilter] = useState<TStatusFilter>(() => {
    const savedStatus =
      typeof window !== "undefined"
        ? localStorage.getItem("statusFilter")
        : null;
    return (
      getStatusFilterFromQuery(query.statusFilter) ||
      (savedStatus ? (savedStatus as TStatusFilter) : null)
    );
  });

  const [levelFilter, setLevelFilter] = useState<TLevelFilter>(() => {
    const savedLevel =
      typeof window !== "undefined"
        ? localStorage.getItem("levelFilter")
        : null;
    return (
      getLevelFilterFromQuery(query.levelFilter) ||
      (savedLevel ? (savedLevel as TLevelFilter) : null)
    );
  });

  const [issuesList, setIssuesList] = useState<TIssuesList>("all");
  const [searchInput, setSearchInput] = useState<string>("");

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    if (statusFilter === null && levelFilter === null) {
      setIssuesList("all");
    } else if (statusFilter === "resolved" && levelFilter === null) {
      setIssuesList("resolved");
    } else if (statusFilter === "unresolved" && levelFilter === null) {
      setIssuesList("unresolved");
    } else if (statusFilter === "resolved" && levelFilter !== null) {
      setIssuesList(
        `resolved${capitalizeFirstLetter(levelFilter)}` as TIssuesList,
      );
    } else if (statusFilter === "unresolved" && levelFilter !== null) {
      setIssuesList(
        `unresolved${capitalizeFirstLetter(levelFilter)}` as TIssuesList,
      );
    } else if (statusFilter === null && levelFilter !== null) {
      setIssuesList(levelFilter);
    }
  }, [statusFilter, levelFilter]);

  useEffect(() => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...query,
          statusFilter: statusFilter || undefined,
          levelFilter: levelFilter || undefined,
        },
      },
      undefined,
      { shallow: true },
    );
  }, [statusFilter, levelFilter]);

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = e.target.value;
    setStatusFilter(value === "" ? null : (value as TStatusFilter));
    if (typeof window !== "undefined") {
      localStorage.setItem("statusFilter", value === "" ? "" : value);
    }
  };

  const handleLevelFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLevelFilter(value === "" ? null : (value as TLevelFilter));
    if (typeof window !== "undefined") {
      localStorage.setItem("levelFilter", value === "" ? "" : value);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInputString = e.target.value.toLowerCase();
    setSearchInput(searchInputString);
  };

  const page = Number(router.query.page || 1);
  const issuesPage = useGetIssues(page);

  const items: Issue[] = issuesPage.data?.items || [];

  const resolvedIssues = items.filter((issue) => {
    return issue.status === "resolved";
  });

  const unresolvedIssues = items.filter((issue) => {
    return issue.status === "open";
  });

  const errorIssues = items.filter((issue) => {
    return issue.level === "error";
  });

  const warningIssues = items.filter((issue) => {
    return issue.level === "warning";
  });

  const infoIssues = items.filter((issue) => {
    return issue.level === "info";
  });

  const resolvedErrorIssues = items.filter((issue) => {
    return issue.status === "resolved" && issue.level === "error";
  });

  const resolvedWarningIssues = items.filter((issue) => {
    return issue.status === "resolved" && issue.level === "warning";
  });

  const resolvedInfoIssues = items.filter((issue) => {
    return issue.status === "resolved" && issue.level === "info";
  });

  const unresolvedErrorIssues = items.filter((issue) => {
    return issue.status === "open" && issue.level === "error";
  });

  const unresolvedWarningIssues = items.filter((issue) => {
    return issue.status === "open" && issue.level === "warning";
  });

  const unresolvedInfoIssues = items.filter((issue) => {
    return issue.status === "open" && issue.level === "info";
  });

  const issues: { [key in TIssuesList]: Issue[] } = {
    all: items,
    resolved: resolvedIssues,
    unresolved: unresolvedIssues,
    error: errorIssues,
    warning: warningIssues,
    info: infoIssues,
    resolvedError: resolvedErrorIssues,
    resolvedWarning: resolvedWarningIssues,
    resolvedInfo: resolvedInfoIssues,
    unresolvedError: unresolvedErrorIssues,
    unresolvedWarning: unresolvedWarningIssues,
    unresolvedInfo: unresolvedInfoIssues,
  };

  const showIssues = issues[issuesList];

  const value = {
    statusFilter,
    levelFilter,
    handleStatusFilterChange,
    handleLevelFilterChange,
    handleSearchInputChange,
    issuesList,
    setIssuesList,
    showIssues,
    searchInput,
  };

  return (
    <IssueFilterContext.Provider value={value}>
      {children}
    </IssueFilterContext.Provider>
  );
};

export const useIssueFilter = () => useContext(IssueFilterContext);
