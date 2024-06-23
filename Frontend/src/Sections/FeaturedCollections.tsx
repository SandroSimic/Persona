import Heading from "../components/UI/Heading";
import Collection from "../components/featuredCollections/Collection";
import styles from "./FeaturedCollections.module.scss";

const FeaturedCollections = () => {
  return (
    <section className={styles.featuredCollectionSection}>
      <Heading mainText="FEATURED COLLECTIONS" subText="Explore some of our new collections"/>
      <div className={styles.featuredGrid}>
        <Collection
          mainText="PANTS"
          className={`${styles.gridItem} ${styles.gridItem1}`}
        />
        <Collection
          mainText="SHIRTS"
          className={`${styles.gridItem} ${styles.gridItem2}`}
        />
        <Collection
          mainText="HOODIES"
          className={`${styles.gridItem} ${styles.gridItem3}`}
        />
        <Collection
          mainText="SNEAKERS"
          className={`${styles.gridItem} ${styles.gridItem4}`}
        />
        <Collection
          mainText="ACCESSORIES"
          className={`${styles.gridItem} ${styles.gridItem5}`}
        />
        <Collection
          mainText="JACKETS"
          className={`${styles.gridItem} ${styles.gridItem6}`}
        />
      </div>
    </section>
  );
};

export default FeaturedCollections;
