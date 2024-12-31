/* eslint-disable react/prop-types */
import AdminProductCard from "./adminProductCard/AdminProductCard";
import styles from "./AdminProductsList.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";

const AdminProductsList = ({ products }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    searchParams.delete("id");
    searchParams.set("id", id);
    navigate(`/admin/products?${searchParams.toString()}`);
  };

  console.log(products);

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
