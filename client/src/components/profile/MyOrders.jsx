import { useSearchParams } from "react-router-dom";
import { useMyOrders } from "../../hooks/order/useMyOrders";
import Pagination from "../ui/Pagination";
import styles from "./MyOrders.module.scss";
import MyOrdersHeader from "./MyOrdersHeader";
import MyOrdersList from "./MyOrdersList";

function MyOrders() {
  // Initialize searchParams before using them
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 2;

  const { data } = useMyOrders({
    page,
    limit,
  });

  // Adjusted to match your response structure
  const orders = data?.data?.data || [];

  return (
    <div className={styles.myOrders}>
      <h2>My Orders</h2>
      <div className={styles.orderList}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id}>
              <MyOrdersHeader order={order} />
              <div className={styles.orderItems}>
                {order.orderItems?.map((orderItem) => (
                  <MyOrdersList key={orderItem._id} orderItem={orderItem} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
      <div className={styles.pagination}>
        <Pagination
          totalItems={data?.totalItems || 0}
          currentPage={page}
          itemsPerPage={limit}
        />
      </div>
    </div>
  );
}

export default MyOrders;
