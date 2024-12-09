import Section from "./../components/ui/Section";
import Heading from "./../components/ui/Heading";
import specialOffersImg from "./../assets/specialOffers.png";
import styles from "./SpecialOffersSection.module.scss";

const SpecialOffersSection = () => {
  return (
    <Section className={styles.specialOffersSection}>
      <Heading mainHeading="SPECIAL OFFERS" />
      <div className={styles.specialOffersContainer}>
        <div className={styles.specialOffersImgContainer}>
          <img src={specialOffersImg} alt="special offer image" />
        </div>
        <div className={styles.specialOffersMainText}>
          <h1>FIND YOUR PERFECT LOOK AT PERSONA</h1>
          <p>
            Step into savings paradise with our exclusive special offers. From
            trendy must-haves to timeless classics, find fashion-forward pieces
            at prices that will make you smile. With new deals added regularly,
            there&apos;s always something stylish waiting just for you
          </p>
          <div className={styles.specialOffersAction}>
            <h3>SALES AND DISCOUNTS!</h3>
            <div>
              <span>60%</span>
              <button>Shop Now</button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SpecialOffersSection;
