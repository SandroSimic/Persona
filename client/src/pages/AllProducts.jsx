import { useSearchParams } from "react-router-dom";
import ProductsBanner from "../components/products/ProductsBanner";
import ProductsFilter from "../components/products/ProductsFilter";
import ProductsList from "../components/products/ProductsList";
import styles from "./AllProducts.module.scss";
import { useProducts } from "../components/admin/adminQueries/useGetProduct";
import Pagination from "../components/ui/Pagination";

const AllProducts = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 12;
  const { data } = useProducts({
    page,
    limit,
    search: searchParams.get("search"),
    sort: searchParams.get("sort"),
    "totalPrice[gt]": searchParams.get("totalPrice[gt]"),
    "totalPrice[lt]": searchParams.get("totalPrice[lt]"),
    "priceDiscount[gt]": searchParams.get("priceDiscount[gt]"),
    "priceDiscount[lt]": searchParams.get("priceDiscount[lt]"),
    category: searchParams.get("category"),
    type: searchParams.get("type"),
  });

  const totalItems = data?.totalItems || 0; // Total items from API
  const totalPages = Math.ceil(totalItems / limit); // Calculate total pages

  return (
    <div className={styles.allProductsPage}>
      <ProductsBanner />
      <ProductsFilter />
      <ProductsList  products={data?.data?.data}/>
      {totalItems > 0 && totalPages > 1 && (
        <Pagination
          totalItems={totalItems}
          currentPage={page}
          itemsPerPage={limit}
        />
      )}
    </div>
  );
};

export default AllProducts;
