import { useIssueFilter } from "@features/issues";
import styles from "./issue-filter.module.scss";

const IssueFilter = () => {
  const {
    statusFilter,
    levelFilter,
    handleStatusFilterChange,
    handleLevelFilterChange,
    handleSearchInputChange,
  } = useIssueFilter();

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

      <input
        className={styles.searchBox}
        type="search"
        placeholder="Project Name"
        onChange={handleSearchInputChange}
      />
    </div>
  );
};

export default IssueFilter;
