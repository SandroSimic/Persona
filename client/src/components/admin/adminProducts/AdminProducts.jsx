import Pagination from "../../ui/Pagination";
import styles from "./AdminProducts.module.scss";
import AdminProductsFilter from "./AdminProductsFilter";
import AdminProductsList from "./AdminProductsList";
import AdminProductsTitle from "./AdminProductsTitle";

const AdminProducts = () => {
  return (
    <div className={styles.adminProducts}>
      <AdminProductsTitle />
      <AdminProductsFilter />
      <AdminProductsList />
      <Pagination />
    </div>
  );
};

export default AdminProducts;
