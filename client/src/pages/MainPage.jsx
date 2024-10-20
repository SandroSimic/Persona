import FeaturedCollection from "../sections/FeaturedCollection";
import HeroSection from "../sections/HeroSection";
import PopularProducts from "../sections/PopularProducts";

const MainPage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedCollection />
      <PopularProducts />
    </div>
  );
};

export default MainPage;
