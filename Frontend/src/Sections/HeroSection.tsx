import styles from "./HeroSection.module.scss";

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.hero}>
        <h1>
          IN THE RIGHT OUTFIT
          <br />
          ANYTHING IS POSSIBLE
        </h1>
        <div className={styles.heroAction}>
          <button className={styles.collectionBtn}>COLLECTIONS</button>
          <button className={styles.shopNow}>SHOP NOW</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
