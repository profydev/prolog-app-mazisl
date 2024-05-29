import styles from "./error-display.module.scss";
import { Routes } from "@config/routes";

export function ErrorDisplay() {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorLeft}>
        <div className={styles.exclamationContainer}>
          <img
            className={styles.exclamation}
            alt="exclamation"
            src="/icons/exclamation.svg"
          />
        </div>
        <p>There was a problem while loading the project data</p>
      </div>

      <a className={styles.errorRight} href={Routes.projects}>
        <p>Try again</p>
        <img
          className={styles.arrowRight}
          alt="arrow-right"
          src="/icons/arrow-right.svg"
        />
      </a>
    </div>
  );
}
