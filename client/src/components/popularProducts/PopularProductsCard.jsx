/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./PopularProductsCard.module.scss";

const PopularProductsCard = ({ image, name, price, id }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.popularProductsCard}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.textWrapper}>
        <h3>{name}</h3>
        <p>{price}$</p>
      </div>
      <button
        className={styles.button}
        onClick={() => navigate(`/product/${id}`)}
      >
        View Product{" "}
      </button>
    </div>
  );
};

export default PopularProductsCard;
