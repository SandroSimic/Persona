/* eslint-disable react/prop-types */
import uploadImg from "./../../../../assets/upload.png";
import styles from "./AdminProductImageForm.module.scss";
import trash from "./../../../../assets/trash.png";
import Input from "../../../ui/Input";
import { useProduct } from "../../../../context/ProductContext";

function AdminProductImageForm() {
  const { productData, addImages, removeImage } = useProduct();

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    const newImages = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    addImages(newImages);
  };

  const handleRemoveImage = (index) => {
    removeImage(index);
  };

  return (
    <div className={styles.productFormImages}>
      <Input
        placeholder={"Upload product image"}
        fileText={"Upload product image max (6) min (1)"}
        type={"file"}
        fileIcon={uploadImg}
        multiple={true}
        seeImage={true}
        onChange={handleFileChange}
      />

      <div className={styles.imagesArray}>
        {productData.images.length === 0 && (
          <p className={styles.noImages}>No images uploaded</p>
        )}
        {productData.images.map((image, index) => (
          <div className={styles.imagePreview} key={index}>
            <div className={styles.imageWrapper}>
              <img
                src={image.preview}
                alt={`Product ${index + 1}`}
                className={styles.image}
              />
              <p>{image.file?.name || "Existing Image"}</p>
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
