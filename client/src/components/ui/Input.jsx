/* eslint-disable react/prop-types */
import styles from "./Input.module.scss";

const Input = ({ placeholder, type, value, onChange }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
