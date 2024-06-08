import { useEffect, useState } from "react";
import styles from "./footer.module.scss";
import Image from "next/image";

export function Footer() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersion = async () => {
      const packageJson = await import("../../../package.json");
      setVersion(packageJson.version);
    };
    fetchVersion();
  }, []);

  if (!version) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.left}>Version: {version}</div>
      <div className={styles.center}>
        <a href="#" className={styles.link}>
          Docs
        </a>
        <a href="#" className={styles.link}>
          API
        </a>
        <a href="#" className={styles.link}>
          Help
        </a>
        <a href="#" className={styles.link}>
          Community
        </a>
      </div>
      {/* Image from Next js is used instead of regular img tag */}
      <div className={styles.right}>
        <Image
          src="/icons/logo-small.svg"
          alt="Logo"
          className={styles.logo}
          width={24}
          height={24}
        />
      </div>
    </footer>
  );
}
