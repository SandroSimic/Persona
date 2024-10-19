/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Input.module.scss";

const Input = ({
  placeholder,
  type,
  value,
  onChange,
  accept = "image/*",
  required,
  className,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImagePreview(URL.createObjectURL(file));
      } else {
        setImagePreview(null);
      }
    } else {
      setImagePreview(null);
    }

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={styles.inputWrapper}>
      {type === "file" ? (
        <div className={styles.pictureWrapper}>
          <label className={styles.profileLabel}>
            <input
              type="file"
              className={styles.fileInput}
              accept={accept}
              onChange={handleFileChange}
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className={styles.imagePreview}
              />
            ) : (
              <span className={styles.placeholderText}>
                ENTER YOUR PROFILE PICTURE
              </span>
            )}
          </label>
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          {required ? <div className={styles.required}>*</div> : null}
          <input
            type={type}
            className={`${styles.input} ${className ? className : ""}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};

export default Input;
