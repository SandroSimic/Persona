import styles from "./FeaturedCollectionGrid.module.scss";


const FeaturedCollectionGrid = () => {
  return (
    <div className={styles.parent}>
      <div className={styles.pants}>
        <p>PANTS</p>
        <button>Discover</button>
      </div>
      <div className={styles.hoodie}>
        <p>HOODIE</p>
        <button>Discover</button>
      </div>
      <div className={styles.accessories}>
        <p>ACCESSORIES</p>
        <button>Discover</button>
      </div>
      <div className={styles.shirts}>
        <p>SHIRTS</p>
        <button>Discover</button>
      </div>
      <div className={styles.sneakers}>
        <p>SNEAKERS</p>
        <button>Discover</button>
      </div>
      <div className={styles.jacket}>
        <p>JACKET</p>
        <button>Discover</button>
      </div>
    </div>
  );
};

export default FeaturedCollectionGrid;
