/* eslint-disable react/prop-types */
import styles from "./AdminProductCard.module.scss";
function AdminProductCard({ product }) {
  console.log(product);

  return (
    <div className={styles.adminProductCard}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} />
      </div>
      <div className={styles.productInfo}>
        <h3>{product.name}</h3>
        <p>
          <span>Price:</span> {product.price}
        </p>
        <div>
          <p>
            <span>Stock:</span> {product.id}
          </p>
          <p>
            <span>Sold:</span> {product.id}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminProductCard;
