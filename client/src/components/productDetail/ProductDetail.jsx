/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./ProductDetail.module.scss";
import { FaRegHeart } from "react-icons/fa";
import { useAddToCart } from "../../hooks/cart/useAddToCart";

function ProductDetail({ data }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false); // State to track size selection error
  const { mutate, isPending } = useAddToCart();

  console.log(data);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setSizeError(false); // Clear the error if a size is selected
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true); // Trigger error if no size is selected
      return;
    }

    // Add product to the cart
    mutate({ productId: data._id, selectedSize: selectedSize.name, quantity });
  };

  return (
    <div className={styles.productDetail}>
      <h1 className={styles.title}>{data.title}</h1>

      <div className={styles.productInfo}>
        <div className={styles.productPrice}>
          <div className={styles.priceWithDiscount}>
            {data.priceDiscount && data.priceDiscount > 0 ? (
              <>
                <span className={styles.priceDiscount}>
                  ${data.totalPrice.toFixed(2)}
                </span>
                <span className={styles.normalPrice}>
                  ${data.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className={styles.regularPrice}>
                ${data.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <div className={styles.line} />
        <div className={styles.sizesContainer}>
          <div className={styles.sizeInfo}>
            <span className={styles.sizeTitle}>Size:</span>
            <span className={styles.sizeGuide}>
              {selectedSize
                ? `Available Quantity: ${selectedSize.qty}`
                : "Select a size"}
            </span>
          </div>
          <div className={styles.sizes}>
            {data?.sizes?.map((size) => (
              <button
                key={size.name}
                className={`${styles.size} ${
                  selectedSize?._id === size._id ? styles.selectedSize : ""
                } ${sizeError ? styles.errorBorder : ""}`} // Add error style if sizeError is true
                onClick={() => handleSizeClick(size)}
              >
                {size.name}
              </button>
            ))}
          </div>
          {sizeError && (
            <div className={styles.errorMessage}>
              Please select a size before adding to cart.
            </div>
          )}
        </div>
        <div className={styles.line} />
        <div className={styles.cta}>
          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <div className={styles.buttons}>
            <button
              className={styles.addToCart}
              onClick={handleAddToCart}
              disabled={isPending}
            >
              {isPending ? "Adding to Cart..." : "Add To Cart"}
            </button>
            <button className={styles.addToWhishList}>
              <FaRegHeart />
              <span>Add To WishList</span>
            </button>
          </div>
        </div>
        <div className={styles.line} />
        <div>REVIEWS</div>
      </div>
    </div>
  );
}

export default ProductDetail;
