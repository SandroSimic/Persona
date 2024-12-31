import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import styles from "./AdminProducts.module.scss";
import AdminProductsFilter from "./AdminProductsFilter";
import AdminProductsList from "./AdminProductsList";
import AdminProductsTitle from "./AdminProductsTitle";
import AdminProductDetails from "./adminProductCard/AdminProductDetails";
import { useProducts } from "../adminQueries/useGetProduct";

const AdminProducts = () => {
  const [searchParams] = useSearchParams();
  const productIdParam = searchParams.get("id");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 12;
  const { data } = useProducts({
    page,
    limit,
    search: searchParams.get("search"),
    sort: searchParams.get("sort"),
  });

  const totalItems = data?.totalItems || 0; // Total items from API
  const totalPages = Math.ceil(totalItems / limit); // Calculate total pages

  console.log(data);

  return (
    <div
      className={`${
        productIdParam ? styles.adminWrapperHalf : styles.adminWrapper
      } `}
    >
      <div className={styles.adminProducts}>
        <AdminProductsTitle />
        <AdminProductsFilter />
        <AdminProductsList products={data?.data?.data} />
        {totalItems > 0 && totalPages > 1 && (
          <Pagination
            totalItems={totalItems}
            currentPage={page}
            itemsPerPage={limit}
          />
        )}
      </div>
      {productIdParam && <AdminProductDetails productId={productIdParam} />}
    </div>
  );
};

export default AdminProducts;
