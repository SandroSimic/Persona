import Heading from "../components/UI/Heading";
import soImg from "../images/SpecialOfferImg.png";
import styles from "./SpecialOffer.module.scss";

const SpecialOffer = () => {
  return (
    <section className={styles.specialOffersSection}>
      <Heading mainText="SPECIAL OFFERS" />
      <div className={styles.specialOffer}>
        <div className={styles.specialOfferImg}>
          <img src={soImg} alt="Special Offers Image" />
        </div>
        <div className={styles.specialOfferText}>
            <h2>FIND YOUR PERFECT LOOK AT PERSONA</h2>
            <p>
              Step into savings paradise with our exclusive special offers. From
              trendy must-haves to timeless classics, find fashion-forward
              pieces at prices that will make you smile. With new deals added
              regularly, there's always something stylish waiting just for you
            </p>
          <div className={styles.specialOffersAction}>
            <h3>SALES AND DISCOUNTS!</h3>
            <div className={styles.sale}>
              <span>60%</span>
              <button>Shop Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
