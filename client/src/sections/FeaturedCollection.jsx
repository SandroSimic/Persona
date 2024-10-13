import Heading from "../components/ui/Heading";
import Section from "../components/ui/Section";
import styles from "./FeaturedCollection.module.scss";

const FeaturedCollection = () => {
  return (
    <Section className={styles.featuredCollection}>
      <Heading
        mainHeading={"FEATURED COLLECTIONS"}
        subHeading={"Explore some of our new collections"}
      />
      <div>GRID</div>
    </Section>
  );
};

export default FeaturedCollection;
