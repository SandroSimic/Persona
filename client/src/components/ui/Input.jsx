/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Input.module.scss";

const Input = ({
  placeholder,
  type,
  fileText,
  fileIcon,
  value,
  onChange,
  accept = "image/*",
  required,
  className,
  seeImage,
  name,
  multiple,
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
              name={name}
              type="file"
              multiple={multiple}
              className={styles.fileInput}
              accept={accept}
              onChange={handleFileChange}
            />
            {!seeImage && imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className={styles.imagePreview}
              />
            ) : (
              <div className={styles.fileWrapper}>
                {fileIcon ? (
                  <img
                    src={fileIcon}
                    alt="File Icon"
                    className={styles.fileIcon}
                  />
                ) : null}
                <span className={styles.placeholderText}>
                  {fileText ? fileText : "Choose a file"}
                </span>
              </div>
            )}
          </label>
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          {required ? <div className={styles.required}>*</div> : null}
          <input
            name={name}
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
