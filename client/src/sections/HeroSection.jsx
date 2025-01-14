import styles from "./HeroSection.module.scss";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.textWrapper}>
        <h1>IN THE RIGHT OUTFIT ANYTHING IS POSSIBLE</h1>
        <div className={styles.buttons}>
          <Link to="/products" className={styles.shopNowBtn}>shop now</Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
