import styles from "./AdminDashOrderTable.module.scss";
import Pagination from "../../ui/Pagination";
import { FaRegEye } from "react-icons/fa";
import { useGetOrders } from "../adminQueries/useGetOrders";
import { useSearchParams } from "react-router-dom";

function AdminDashOrdersTable() {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 10;
  const { data, isPending } = useGetOrders({
    page,
    limit,
  });
  const totalItems = data?.totalItems || 0;

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Country</th>
            <th>Address</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.data.map((order) => (
            <tr key={order.id}>
              <td>{order.name + " " + order.surname}</td>
              <td>{order.phone}</td>
              <td>{order.country}</td>
              <td>{order.address}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td
                className={`${styles.order} ${
                  order.status === "approved"
                    ? styles.green
                    : order.status === "rejected"
                    ? styles.red
                    : ""
                }`}
              >
                <span>{order.status}</span>
              </td>
              <td className={styles.action}>
                <FaRegEye size={25} className={styles.icon} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={limit}
        totalItems={totalItems}
        currentPage={page}
      />
    </div>
  );
}

export default AdminDashOrdersTable;
