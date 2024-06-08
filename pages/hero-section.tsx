import { useState, useEffect } from "react";
import styles from "./hero-section.module.scss";

const baseUrl = "https://prolog-api.profy.dev";
const slug = "home";
const endpoint = `${baseUrl}/content-page/${slug}`;

type HeroImg = {
  src: string;
  width: number;
  height: number;
};

type Hero = {
  sectionType: string;
  theme: string;
  title: string;
  subtitle: string;
  image: HeroImg;
};

const getHero = () => {
  return fetch(endpoint).then((response) => {
    if (!response.ok) {
      throw new Error(`Could not get hero section! Status: ${response.status}`);
    }
    return response.json();
  });
};

export const HeroSection = () => {
  const [heroSection, setHeroSection] = useState<Hero | null>(null);

  const fetchHero = () => {
    return getHero()
      .then((data) => setHeroSection(data.sections[0]))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchHero();
  }, []);

  if (!heroSection) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.hero}>
      <h1>{heroSection.title}</h1>
      <p>{heroSection.subtitle}</p>
      <img
        src={`${baseUrl}${heroSection.image.src}`}
        alt={heroSection.title}
        width={heroSection.image.width}
        height={heroSection.image.height}
      />
    </div>
  );
};
