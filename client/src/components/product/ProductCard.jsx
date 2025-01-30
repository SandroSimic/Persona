/* eslint-disable react/prop-types */
import styles from "./ProductCard.module.scss";

const ProductCard = ({ product, onClick }) => {
  return (
    <div className={styles.productCard}>
      <div
        className={styles.productCardImage}
        onClick={() => onClick(product._id)}
      >
        <img src={product.images[0]} alt={product.title} />
        {product.priceDiscount > 0 && (
          <div className={styles.saleTag}>SALE</div>
        )}
      </div>
      <div className={styles.productCardDetails}>
        <div className={styles.productCardDetailsContainer}>
          <h4
            className={styles.productCardTitle}
            onClick={() => onClick(product._id)}
          >
            {product.title}
          </h4>

          <div className={styles.productCardPriceContainer}>
            {product.priceDiscount && product.priceDiscount > 0 ? (
              <>
                <span className={styles.productCardPriceDiscount}>
                  ${product.totalPrice.toFixed(2)}
                </span>
                <span className={styles.productCardPriceLine}>
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className={styles.productCardPrice}>
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
      <div>
        <p>RATING</p>
      </div>
      <button className={styles.btnView} onClick={() => onClick(product._id)}>
        view product
      </button>
    </div>
  );
};

export default ProductCard;
