import { LineType } from "../../types/UI.types";
import styles from "./UI.module.scss";

function Line({ or, color, className }: LineType) {
  if (or) {
    return (
      <div className={styles.or}>
        <span>or</span>
        <div className={styles.line} />
      </div>
    );
  }

  return (
    <div
      className={`${styles.line} ${className ? className : ""}`}
      style={{ backgroundColor: color ? color : "" }}
    />
  );
}

export default Line;
