import FeaturedCollections from "../Sections/FeaturedCollections";
import FooterNav from "../Sections/FooterNav";
import HeroSection from "../Sections/HeroSection";
import PopularProducts from "../Sections/PopularProducts";
import SpecialOffer from "../Sections/SpecialOffer";
import styles from './MainPage.module.scss'
const MainPage = () => {
  return <div className={styles.mainPage}>
    <HeroSection />
    <FeaturedCollections />
    <PopularProducts />
    <SpecialOffer />
    <FooterNav />
  </div>;
};

export default MainPage;
