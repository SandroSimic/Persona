/* eslint-disable react/prop-types */
import styles from "./Spinner.module.scss";

const Spinner = ({ mini }) => {
  return <div className={`${styles.loader} ${mini ? styles.mini : ""}`}></div>;
};

export default Spinner;
