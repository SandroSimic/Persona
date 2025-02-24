/* eslint-disable react/prop-types */
import { getProductDetail } from "../../hooks/product/useGetProduct";
import styles from "./MyOrdersList.module.scss";

function MyOrdersList({ orderItem }) {
  const { data } = getProductDetail(orderItem.productId);

  return (
    <div className={styles.myOrdersList}>
      <div className={styles.orderItem}>
        <div className={styles.image}>
          <img src={data?.data?.doc.images[0]} />
        </div>
        <div className={styles.details}>
          <div className={styles.title}>
            <h2>
              {data?.data?.doc.title} ({orderItem.selectedSizeQty})
            </h2>
            <span>Size:{orderItem.selectedSize}</span>
          </div>
          <div className={styles.price}>
            <p>Total Price ${orderItem.fullPrice.toFixed(2)}</p>
            <span>Price per unit: ${data?.data?.doc.price}</span>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button>View Product</button>
      </div>
    </div>
  );
}

export default MyOrdersList;
