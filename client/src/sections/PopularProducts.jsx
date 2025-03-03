import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PopularProductsCard from "../components/popularProducts/PopularProductsCard";
import Heading from "../components/ui/Heading";
import styles from "./PopularProducts.module.scss";
import Section from "../components/ui/Section";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useGetPopularProducts } from "../hooks/product/useGetPopularProducts";

const PopularProducts = () => {
  const navigate = useNavigate();

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1590, // Small desktop
        settings: {
          slidesToShow: 3, // Show 3 products on small desktop
        },
      },
      {
        breakpoint: 992, // Tablets
        settings: {
          slidesToShow: 2, // Show 2 products on tablets
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1, // Show 1 product on mobile
        },
      },
    ],
  };

  const { data } = useGetPopularProducts();

  return (
    <Section className={styles.popularProductsSection}>
      <Heading
        mainHeading="POPULAR PRODUCTS"
        subHeading="Explore some of our most popular products"
      />
      <Slider {...settings} className={styles.productSlider}>
        {data?.data?.popularProducts.map((product) => (
          <PopularProductsCard
            key={product.id}
            id={product._id}
            image={product.images[0]}
            name={product.title}
            price={product.totalPrice.toFixed(2)}
          />
        ))}
      </Slider>
      <button
        onClick={() => navigate("/products")}
        className={styles.allProductBtn}
      >
        View All Products
      </button>
    </Section>
  );
};

export default PopularProducts;
