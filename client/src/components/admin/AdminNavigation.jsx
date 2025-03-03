import productsIcon from "../../assets/productIcon.png";
import dashboardIcon from "../../assets/dashboardIcon.png";
import logo from "../../assets/logo.png";
import { useLoggedInUser } from "../login/useGetLoggedInUser";
import { SkeletonLoader } from "../navigation/Navigation";
import styles from "./AdminNavigation.module.scss";
import { Link } from "react-router-dom";

const AdminNavigation = () => {
  const { data, isLoading } = useLoggedInUser();

  return (
    <div className={styles.adminNavigation}>
      <Link to={"/"}>
        <img src={logo} alt="logo" />
      </Link>
      <div className={styles.navigation}>
        <ul className={styles.navItems}>
          <li>
            <Link to={"/admin"}>
              <img src={dashboardIcon} alt="dashboard" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin/products"}>
              <img src={productsIcon} alt="products" />
              <span>Products</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          data?.user && (
            <img
              src={data?.user?.userImage}
              className={styles.userProfile}
              alt="User Profile"
              // onClick={handleOpenUserMenu}
            />
          )
        )}
      </div>
    </div>
  );
};

export default AdminNavigation;
