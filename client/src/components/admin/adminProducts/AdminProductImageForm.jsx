import { useState } from "react";
import Input from "../../ui/Input";
import uploadImg from "./../../../assets/upload.png";
import styles from "./AdminProductImageForm.module.scss";
import trash from './../../../assets/trash.png';

function AdminProductImageForm() {
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (images.length + selectedFiles.length > 6) {
      alert("You can only upload a maximum of 6 images.");
      return;
    }

    const newImages = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className={styles.productFormImages}>
      <Input
        placeholder={"Upload product image"}
        fileText={"Upload product image max (6) min (1)"}
        type={"file"}
        fileIcon={uploadImg}
        multiple={true}
        required
        seeImage={true}
        onChange={handleFileChange}
      />

      <div className={styles.imagesArray}>
        {images.length === 0 && (
          <p className={styles.noImages}>No images uploaded</p>
        )}
        {images.map((image, index) => (
          <div className={styles.imagePreview} key={index}>
            <div className={styles.imageWrapper}>
              <img
                src={image.preview}
                alt={`Product ${index + 1}`}
                className={styles.image}
              />
              <p>{image.file.name}</p>
            </div>
            <div className={styles.imageInfo}>
              <button
                type="button"
                className={styles.trashButton}
                onClick={() => handleRemoveImage(index)}
              >
                <img src={trash} alt="Delete" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProductImageForm;
