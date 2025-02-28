import { useNavigate } from "react-router-dom";
import styles from "./FeaturedCollectionGrid.module.scss";

const FeaturedCollectionGrid = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.parent}>
      <div className={styles.pants}>
        <p>PANTS</p>
        <button onClick={() => navigate("/products?type=Pants")}>
          Discover
        </button>
      </div>
      <div className={styles.hoodie}>
        <p>HOODIE</p>
        <button onClick={() => navigate("/products?type=Hoodie")}>
          Discover
        </button>
      </div>
      <div className={styles.accessories}>
        <p>ACCESSORIES</p>
        <button onClick={() => navigate("/products?type=accessorie")}>
          Discover
        </button>
      </div>
      <div className={styles.shirts}>
        <p>SHIRTS</p>
        <button onClick={() => navigate("/products?type=Shirt")}>
          Discover
        </button>
      </div>
      <div className={styles.sneakers}>
        <p>SNEAKERS</p>
        <button onClick={() => navigate("/products?type=Sneakers")}>
          Discover
        </button>
      </div>
      <div className={styles.jacket}>
        <p>JACKET</p>
        <button onClick={() => navigate("/products?type=Jacket")}>
          Discover
        </button>
      </div>
    </div>
  );
};

export default FeaturedCollectionGrid;
