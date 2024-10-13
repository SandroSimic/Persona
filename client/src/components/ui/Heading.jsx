/* eslint-disable react/prop-types */
import styles from "./Heading.module.scss";

const Heading = ({ mainHeading, subHeading }) => {
  return (
    <div className={styles.headingWrapper}>
      <h1 className={styles.mainHeading}>{mainHeading}</h1>
      <p className={styles.subHeading}>{subHeading}</p>
    </div>
  );
};

export default Heading;
