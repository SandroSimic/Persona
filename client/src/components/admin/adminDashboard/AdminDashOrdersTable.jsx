import styles from "./AdminDashOrderTable.module.scss";
import Pagination from "../../ui/Pagination";
import { FaRegEye, FaTrash } from "react-icons/fa";
import { useGetOrders } from "../adminQueries/useGetOrders";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Modal from "../../ui/Modal";
import AdminModalOrderProducts from "./AdminModalOrderProducts";
import { useUpdateOrderStatus } from "../adminQueries/useUpdateOrderStatus";
import { useDeleteOrder } from "../adminQueries/useDeleteOrder";

function AdminDashOrdersTable() {
  const [searchParams] = useSearchParams();
  const { updateOrderStatusMutation } = useUpdateOrderStatus();
  const { deleteOrderQuery } = useDeleteOrder();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 10;
  const { data, isPending } = useGetOrders({
    page,
    limit,
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const totalItems = data?.totalItems || 0;
  const [showModal, setShowModal] = useState(false);

  if (isPending) {
    return <div>Loading...</div>;
  }

  const handleUpdateOrderStatus = async (orderId, status) => {
    await updateOrderStatusMutation({ orderId, status });
    setShowModal(false);
  };

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
                <FaRegEye
                  size={25}
                  className={styles.icon}
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowModal(true);
                  }}
                />
                {order.status === "approved" || order.status === "rejected" ? (
                  <FaTrash
                    className={styles.icon}
                    size={25}
                    onClick={() => deleteOrderQuery(order._id)}
                  />
                ) : null}
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
      {showModal && selectedOrder && (
        <Modal
          big={true}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h1>
                Order From {selectedOrder.name} {selectedOrder.surname}
              </h1>
              <p>
                CreatedAt:{" "}
                {new Date(selectedOrder.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className={styles.modalSubheader}>
              <div className={styles.modalInfo}>
                <p>
                  Country: <span>{selectedOrder.country}</span>
                </p>
                <p>
                  City: <span>{selectedOrder.city}</span>
                </p>
                <p>
                  Address: <span>{selectedOrder.address}</span>
                </p>
              </div>
              <div className={styles.modalInfo}>
                <p>
                  Zip: <span>{selectedOrder.zipCode}</span>
                </p>
                <p>
                  Email: <span>{selectedOrder.email}</span>
                </p>
                <p>
                  Phone: <span>{selectedOrder.phone}</span>
                </p>
              </div>
            </div>
            <div className={styles.modalProducts}>
              <h3>Products:</h3>
              {selectedOrder.orderItems.map((item) => (
                <AdminModalOrderProducts key={item._id} product={item} />
              ))}
            </div>

            <div className={styles.modalFooter}>
              {selectedOrder.status !== "approved" &&
              selectedOrder.status !== "rejected" ? (
                <>
                  <button
                    className={styles.approveBtn}
                    onClick={() =>
                      handleUpdateOrderStatus(selectedOrder._id, "approved")
                    }
                  >
                    Approve
                  </button>
                  <button
                    className={styles.rejectBtn}
                    disabled={
                      selectedOrder.status === "rejected" ||
                      selectedOrder.status === "approved"
                    }
                    onClick={() =>
                      handleUpdateOrderStatus(selectedOrder._id, "rejected")
                    }
                  >
                    Reject
                  </button>
                </>
              ) : (
                <span>Oder is {selectedOrder.status}</span>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AdminDashOrdersTable;
