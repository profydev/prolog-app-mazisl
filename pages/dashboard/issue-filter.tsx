import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./issue-filter.module.scss";

const IssueFilter = () => {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<string | null>(null);

  useEffect(() => {
    const { status, level } = router.query;
    setStatusFilter(status as string | null);
    setLevelFilter(level as string | null);
  }, [router.query]);

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newStatus = e.target.value || null;
    setStatusFilter(newStatus);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, status: newStatus, page: 1 },
    });
  };

  const handleLevelFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLevel = e.target.value || null;
    setLevelFilter(newLevel);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, level: newLevel, page: 1 },
    });
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.statusFilter}>
        <select
          id=""
          value={statusFilter ?? ""}
          onChange={handleStatusFilterChange}
        >
          <option value="">Status</option>
          <option value="resolved">Resolved</option>
          <option value="unresolved">Unresolved</option>
        </select>
      </div>

      <div className={styles.levelFilter}>
        <select
          id=""
          value={levelFilter ?? ""}
          onChange={handleLevelFilterChange}
        >
          <option value="">Level</option>
          <option value="error">Error</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
      </div>

      {/* <input
        className={styles.searchBox}
        type="search"
        placeholder="Project Name"
        onChange={handleSearchInputChange}
      /> */}
    </div>
  );
};

export default IssueFilter;
