import styles from "./HeroSection.module.scss";

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.textWrapper}>
        <h1>IN THE RIGHT OUTFIT ANYTHING IS POSSIBLE</h1>
        <div className={styles.buttons}>
          <button className={styles.collectionsBtn}>collections</button>
          <button className={styles.shopNowBtn}>shop now</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
