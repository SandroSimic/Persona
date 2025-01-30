/* eslint-disable react/prop-types */
import { useDecreaseQuantity } from "../../hooks/cart/useDecreaseQuantity";
import { useIncreaseQuantity } from "../../hooks/cart/useIncreaseQuantity";
import styles from "./ProductCardDrawer.module.scss";
import Spinner from "../ui/Spinner";

const ProductCardDrawer = ({ product }) => {
  const increaseQuantity = useIncreaseQuantity();
  const decreaseQuantity = useDecreaseQuantity();

  const handleIncrease = () => {
    increaseQuantity.mutate({
      productId: product.productId._id,
      selectedSize: product.selectedSize,
    });
  };

  const handleDecrease = () => {
    decreaseQuantity.mutate({
      productId: product.productId._id,
      selectedSize: product.selectedSize,
    });
  };

  return (
    <div className={styles.productCardDrawer}>
      <div className={styles.productCardDrawerHeader}>
        <img src={product.productId.images[0]} />
        <div className={styles.productCardDrawerInfo}>
          <div className={styles.productCardDrawerTitle}>
            <h2>{product.productId.title}</h2>
            <span>({product.selectedSize})</span>
          </div>
          <span>{product.productId.category}</span>
          <div className={styles.productCardDrawerPrice}>
            <p>${product.fullPrice}</p>
            {product.fullPrice !== product.productId.totalPrice && (
              <>
                <div />
                <span>${product.productId.totalPrice} per unit</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.productCardDrawerCounter}>
        <button onClick={handleDecrease} disabled={decreaseQuantity.isPending}>
          {decreaseQuantity.isPending ? <Spinner mini /> : "-"}
        </button>
        <span>{product.selectedSizeQty}</span>
        <button onClick={handleIncrease} disabled={increaseQuantity.isPending}>
          {increaseQuantity.isPending ? <Spinner mini /> : "+"}
        </button>
      </div>
    </div>
  );
};

export default ProductCardDrawer;
