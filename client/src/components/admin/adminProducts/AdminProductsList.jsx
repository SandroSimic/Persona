import { useProducts } from "../adminQueries/useGetProduct";
import AdminProductCard from "./adminProductCard/AdminProductCard";
import styles from "./AdminProductsList.module.scss";
import { useNavigate } from "react-router-dom";

const AdminProductsList = () => {
  const { data } = useProducts();
  const navigate = useNavigate();

  const products = data?.data?.data;

  const handleProductClick = (id) => {
    navigate(`/admin/products?id=${id}`);
  };

  return (
    <div className={styles.adminProductsList}>
      {products?.map((product) => {
        return (
          <AdminProductCard
            key={product._id}
            product={product}
            onClick={() => handleProductClick(product._id)}
          />
        );
      })}
    </div>
  );
};

export default AdminProductsList;
