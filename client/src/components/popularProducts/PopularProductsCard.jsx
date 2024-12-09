/* eslint-disable react/prop-types */
import styles from "./PopularProductsCard.module.scss";

const PopularProductsCard = ({ image, name, price }) => {
  return (
    <div className={styles.popularProductsCard}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.textWrapper}>
        <h3>{name}</h3>
        <p>{price}</p>
      </div>
      <button className={styles.button}>Add to cart</button>
    </div>
  );
};

export default PopularProductsCard;
