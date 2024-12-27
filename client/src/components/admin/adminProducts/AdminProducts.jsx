import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import styles from "./AdminProducts.module.scss";
import AdminProductsFilter from "./AdminProductsFilter";
import AdminProductsList from "./AdminProductsList";
import AdminProductsTitle from "./AdminProductsTitle";
import AdminProductDetails from "./adminProductCard/AdminProductDetails";

const AdminProducts = () => {
  const [searchParams] = useSearchParams();
  const productIdParam = searchParams.get("id");

  return (
    <div
      className={`${
        productIdParam ? styles.adminWrapperHalf : styles.adminWrapper
      } `}
    >
      <div className={styles.adminProducts}>
        <AdminProductsTitle />
        <AdminProductsFilter />
        <AdminProductsList />
        <Pagination />
      </div>
      {productIdParam && <AdminProductDetails productId={productIdParam} />}
    </div>
  );
};

export default AdminProducts;
