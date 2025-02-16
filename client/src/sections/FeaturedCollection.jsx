import Heading from "../components/ui/Heading";
import Section from "../components/ui/Section";
import styles from "./FeaturedCollection.module.scss";
import FeaturedCollectionGrid from "../components/featuredCollection/FeaturedCollectionGrid";

const FeaturedCollection = () => {
  return (
    <Section className={styles.featuredCollection}>
      <Heading
        mainHeading={"FEATURED COLLECTIONS"}
        subHeading={"Explore some of our new collections"}
      />
      <FeaturedCollectionGrid />
    </Section>
  );
};

export default FeaturedCollection;
