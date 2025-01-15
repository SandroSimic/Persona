/* eslint-disable react/prop-types */
import styles from "./ProductDescription.module.scss";

function ProductDescription({ description }) {
  return (
    <div className={styles.productDescription}>
      <h1>Product Details</h1>
      <p>{description}</p>
    </div>
  );
}

export default ProductDescription;
