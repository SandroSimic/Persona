import FeaturedCollection from "../sections/FeaturedCollection";
import HeroSection from "../sections/HeroSection";
import NewsletterSection from "../sections/NewsletterSection";
import PopularProducts from "../sections/PopularProducts";
import SpecialOffersSection from "../sections/SpecialOffersSection";

const MainPage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedCollection />
      <PopularProducts />
      <SpecialOffersSection />
      <NewsletterSection />
    </div>
  );
};

export default MainPage;
