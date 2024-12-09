import { Outlet } from "react-router-dom";
import AdminNavigation from "../components/admin/AdminNavigation";
import styles from "./AdminLayout.module.scss";

const AdminLayout = () => {
  return (
    <div className={styles.adminLayout}>
      <AdminNavigation />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
