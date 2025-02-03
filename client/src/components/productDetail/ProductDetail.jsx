/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import styles from "./ProductDetail.module.scss";
import { FaRegHeart } from "react-icons/fa";
import { useAddToCart } from "../../hooks/cart/useAddToCart";

function ProductDetail({ data, cartData }) {
  const [sizes, setSizes] = useState(
    data.sizes.map((size) => ({ ...size, availableQty: size.qty }))
  );

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const { mutate, isPending } = useAddToCart();
  const debounceRef = useRef(false);

  useEffect(() => {
    if (
      cartData &&
      cartData.data &&
      cartData.data.cart &&
      Array.isArray(cartData.data.cart.products)
    ) {
      const updatedSizes = data.sizes.map((size) => {
        const matchingCartItem = cartData.data.cart.products.find(
          (item) =>
            item.productId._id === data._id && item.selectedSize === size.name
        );
        const availableQty = matchingCartItem
          ? size.qty - matchingCartItem.selectedSizeQty
          : size.qty;
        return { ...size, availableQty };
      });
      setSizes(updatedSizes);

      if (selectedSize) {
        const updatedSelected = updatedSizes.find(
          (s) => s._id === selectedSize._id
        );
        if (updatedSelected) {
          setSelectedSize(updatedSelected);
          if (quantity > updatedSelected.availableQty) {
            setQuantity(updatedSelected.availableQty);
          }
        }
      }
    } else {
      const resetSizes = data.sizes.map((size) => ({
        ...size,
        availableQty: size.qty,
      }));
      setSizes(resetSizes);
    }
  }, [cartData, data.sizes, data._id]);

  const handleSizeClick = (size) => {
    if (size.availableQty === 0) return;

    setSelectedSize(size);
    setSizeError(false);
    setQuantity(1);
    if (quantity > size.availableQty) {
      setQuantity(size.availableQty);
    }
  };

  const handleAddToCart = () => {
    // If we're debouncing, do nothing.
    if (debounceRef.current) return;

    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    if (quantity > selectedSize.availableQty) {
      console.log(
        `Cannot add ${quantity} items. Only ${selectedSize.availableQty} available.`
      );
      return;
    }

    mutate({
      productId: data._id,
      selectedSize: selectedSize.name,
      quantity,
    });

    // Start debounce: block further calls for 400ms.
    debounceRef.current = true;
    setTimeout(() => {
      debounceRef.current = false;
    }, 400);
  };

  // Limit the quantity dropdown to the lesser of availableQty or 10.
  const maxQuantity = selectedSize
    ? Math.min(selectedSize.availableQty, 10)
    : 10;

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
                ? `Available Quantity: ${selectedSize.availableQty}`
                : "Select a size"}
            </span>
          </div>
          <div className={styles.sizes}>
            {sizes.map((size) => (
              <button
                key={size.name}
                className={`${styles.size} ${
                  selectedSize?._id === size._id ? styles.selectedSize : ""
                }`}
                onClick={() => handleSizeClick(size)}
                style={
                  size.availableQty === 0
                    ? {
                        border: "1px solid #AFAFAF",
                        backgroundColor: "#DADADA",
                        color: "#AAAAAA",
                        cursor: "not-allowed",
                      }
                    : {}
                }
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
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {Array.from({ length: maxQuantity }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <div className={styles.buttons}>
            <button
              className={`${styles.addToCart} ${
                isPending || !selectedSize || quantity === 0
                  ? styles.disabledButton
                  : ""
              }`}
              onClick={handleAddToCart}
              disabled={isPending || !selectedSize || quantity === 0}
            >
              {isPending ? "Adding to Cart..." : "Add To Cart"}
            </button>
            <button className={styles.addToWhishList}>
              <FaRegHeart />
              <span>Add To WhishList</span>
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
