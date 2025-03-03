/* eslint-disable react/prop-types */
import styles from "./AdminProductPricing.module.scss";

const AdminProductPricing = ({ product }) => {
  return (
    <div className={styles.adminProductPrice}>
      <h2>Pricing</h2>
      <div className={styles.prices}>
        <div>
          <p>Regular Price</p>
          <span>{product.price}$</span>
        </div>
        <div>
          <p>Discount</p>
          <span>{product.priceDiscount}%</span>
        </div>
        <div>
          <p>Total Price</p>
          <span>{product.totalPrice}$</span>
        </div>
      </div>
      <div className={styles.reviews}>
        <h2>Reviews</h2>
        <div className={styles.reviewsContainer}>
          <div>
            <p>average reviews:</p>
            <span>{product.averageRating}</span>
          </div>
          <div>
            <p>Review Count</p>
            <span>{product.reviews.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductPricing;
