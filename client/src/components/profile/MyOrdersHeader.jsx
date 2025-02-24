/* eslint-disable react/prop-types */
import styles from "./MyOrdersHeader.module.scss";

function MyOrdersHeader({ order }) {
  return (
    <div key={order._id} className={styles.order}>
      <div>
        <p>Date of order</p>
        <span>
          {new Date(order.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      <div>
        <p>Total Amount</p>
        <span>{order.totalPrice.toFixed(2)}</span>
      </div>
      <div>
        <p>Total Items</p>
        <span>{order.orderItems.length}</span>
      </div>
      <div>
        <p>Country</p>
        <span>{order.country}</span>
      </div>
      <div>
        <p>City</p>
        <span>{order.city}</span>
      </div>
      <div>
        <p>Address</p>
        <span>{order.address}</span>
      </div>
    </div>
  );
}

export default MyOrdersHeader;
