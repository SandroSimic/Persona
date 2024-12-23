import { useProducts } from "../adminQueries/useGetProduct";
import AdminProductCard from "./AdminProductCard";
import styles from "./AdminProductsList.module.scss";

const AdminProductsList = () => {
  const { data } = useProducts();

  console.log("PRODCUTDS", data?.data);

  const products = data?.data?.data;

  return (
    <div className={styles.adminProductsList}>
      {products?.map((product) => {
        return <AdminProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default AdminProductsList;
