/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./ProductsList.module.scss";
import ProductCard from "../product/ProductCard";

const ProductsList = ({ products }) => {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`, { replace: true });
  };

  return (
    <div className={styles.productsList}>
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onClick={handleProductClick}
          />
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductsList;
