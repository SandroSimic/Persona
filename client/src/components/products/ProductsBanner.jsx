import banner from "./../../assets/banner.png";
import styles from "./ProductsBanner.module.scss";

const ProductsBanner = () => {
  return (
    <div className={styles.productBanner}>
      <div className={styles.textWrapper}>
        <h1>Grab up to 50% off on some of our amazing products</h1>
        <button>Buy Now</button>
      </div>
      <div className={styles.imageWrapper}>
        <img alt="Image banner wrapper" src={banner} />
      </div>
    </div>
  );
};

export default ProductsBanner;
