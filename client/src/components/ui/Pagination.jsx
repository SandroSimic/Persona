import styles from "./Pagination.module.scss";

const Pagination = () => {
  return (
    <div className={styles.pagination}>
      <div className={styles.text}>
        <p>
          Showing <span>1</span> to <span>10</span> of <span>100</span> results
        </p>
      </div>
      <div className={styles.buttons}>
        <div className={styles.button}>{"<"}</div>
        <div className={styles.btnPages}>
          <button className={styles.buttonCircle}>1</button>
          <button className={styles.buttonCircle}>2</button>
          <button className={styles.buttonCircle}>3</button>
        </div>
        <div className={styles.button}>{">"}</div>
      </div>
    </div>
  );
};

export default Pagination;
