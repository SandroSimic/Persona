import { Outlet } from "react-router-dom";
import AdminNavigation from "../components/admin/AdminNavigation";

const AdminLayout = () => {
  return (
    <>
      <AdminNavigation />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
