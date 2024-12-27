/* eslint-disable react/prop-types */
import styles from './AdminProductDescription.module.scss'

function AdminProductDescription({ product }) {
  return (
    <div className={styles.productDescription}>
      <h2>Description</h2>
      <div className={styles.productDescriptionContent}>
        <div>
          <p>Product Name</p>
          <span>{product.title}</span>
        </div>
        <div>
          <p>Description</p>
          <span>{product.description}</span>
        </div>
      </div>
    </div>
  );
}

export default AdminProductDescription;
