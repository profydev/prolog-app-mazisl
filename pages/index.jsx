import { Routes } from "@config/routes";
import styles from "./index.module.scss";
import { useState } from "react";
import { HeroSection } from "./hero-section";

const IssuesPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header className={styles.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-large.svg" alt="Prolog logo" />
        <nav className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          <a href={Routes.home}>Home</a>
          <a href={Routes.products}>Products</a>
          <a href={Routes.documentation}>Documentation</a>
          <a href={Routes.pricing}>Pricing</a>
          <a className={styles.dashboardLinkMobile} href={Routes.projects}>
            Open Dashboard
          </a>
        </nav>
        <a className={styles.dashboardLinkDesktop} href={Routes.projects}>
          Open Dashboard
        </a>
        <button className={styles.hamburger} onClick={toggleMenu}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>
      <HeroSection />
      <button
        className={styles.contactButton}
        onClick={() =>
          alert(
            "Implement this in Challenge 2 - Modal:\n\nhttps://profy.dev/rjs-challenge-modal",
          )
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </button>
    </div>
  );
};

export default IssuesPage;
