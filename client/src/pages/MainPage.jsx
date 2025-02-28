import FeaturedCollection from "../sections/FeaturedCollection";
import HeroSection from "../sections/HeroSection";
import PopularProducts from "../sections/PopularProducts";
import SpecialOffersSection from "../sections/SpecialOffersSection";

const MainPage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedCollection />
      <PopularProducts />
      <SpecialOffersSection />
    </div>
  );
};

export default MainPage;
