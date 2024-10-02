/* eslint-disable react/prop-types */
import styles from "./Line.module.scss";

const Line = ({ horizontal, or }) => {
  if (horizontal) {
    return <div className={styles.line}></div>;
  }

  if (or) {
    return (
      <div className={styles.or}>
        <span>or</span>
      </div>
    );
  }

  return null;
};

export default Line;
