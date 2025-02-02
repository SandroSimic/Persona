import styles from "./AdminDashboard.module.scss";
import AdminDashInfo from "./adminDashboard/AdminDashInfo";
import AdminDashOrders from "./adminDashboard/AdminDashOrders";

const AdminDashboard = () => {
  return (
    <div className={styles.adminDashboard}>
      <AdminDashInfo />
      <AdminDashOrders />
    </div>
  );
};

export default AdminDashboard;
