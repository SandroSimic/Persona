/* eslint-disable react/prop-types */
import styles from "./AdminProductCard.module.scss";
function AdminProductCard({ product, onClick }) {
  return (
    <div className={styles.adminProductCard} onClick={onClick}>
      {product.priceDiscount ? (
        <div className={styles.saleCard}>SALE</div>
      ) : null}

      <div className={styles.imageWrapper}>
        <img src={product.images[0]} alt={product.title} />
      </div>
      <div className={styles.productInfo}>
        <h3>{product.title}</h3>
        <p>
          <span>Price:</span>{" "}
          {product.totalPrice
            ? product.totalPrice.toFixed(2)
            : product.price.toFixed(2)}
          $
        </p>
        <div>
          <p>
            <span>Stock:</span> {product.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminProductCard;
