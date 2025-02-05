import styles from "./AdminDashOrders.module.scss";
import AdminDashOrdersTable from "./AdminDashOrdersTable";

function AdminDashOrders() {
  return (
    <div className={styles.adminDashOrdersContainer}>
      <p>Orders List</p>
      <AdminDashOrdersTable />
    </div>
  );
}

export default AdminDashOrders;
