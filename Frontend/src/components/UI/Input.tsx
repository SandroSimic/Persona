import styles from "./UI.module.scss";
import Icon from "./Icon";
import { InputType } from "../../types/UI.types";
import { useState } from "react";

const Input = ({ type, className, icon, label }: InputType) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [hasText, setHasText] = useState<boolean>(false);

  const handleFocus = () => setFocus(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    setHasText(e.target.value !== "");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHasText(e.target.value !== "");

  if (type === "file") {
    return (
      <label className={`${styles.inputFile} ${className ? className : ""}`}>
        <input type={type} />
        <div
          className={`${styles.label} `}
          style={{
            left: hasText ? "1rem" : ".1rem",
            top: hasText ? "-.1rem" : "50%",
          }}
        >
          <div>
            <Icon icon="file" />
          </div>
          {label}
        </div>
      </label>
    );
  }

  return (
    <label className={`${styles.input} ${className ? className : ""}`}>
      {!focus && !hasText && icon && (
        <Icon icon={icon} className={styles.iconInput} color={"#BCBCBC"} />
      )}
      <input
        type={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <div
        className={`${styles.label} ${hasText ? styles.labelHasText : ""}`}
        style={
          icon && !hasText
            ? { left: "5rem", top: focus ? "-.1rem" : "50%" }
            : {
                left: hasText ? "1rem" : ".1rem",
                top: focus || hasText ? "-.1rem" : "50%",
                backgroundColor: !focus || hasText ? "white" : "transparent",
                padding: !focus || hasText ? "0rem 1rem" : "0",
              }
        }
      >
        {label}
      </div>
    </label>
  );
};

export default Input;
