import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PopularProductsCard from "../components/popularProducts/PopularProductsCard";
import Heading from "../components/ui/Heading";
import styles from "./PopularProducts.module.scss";
import blackShirtImg from "../assets/blackShirt.png";
import Section from "../components/ui/Section";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
const dummyData = [
  {
    id: 1,
    name: "Product 1",
    price: "$100",
    image: blackShirtImg,
  },
  {
    id: 2,
    name: "Product 2",
    price: "$200",
    image: blackShirtImg,
  },
  {
    id: 3,
    name: "Product 3",
    price: "$300",
    image: blackShirtImg,
  },
  {
    id: 4,
    name: "Product 4",
    price: "$400",
    image: blackShirtImg,
  },
  {
    id: 5,
    name: "Product 5",
    price: "$500",
    image: blackShirtImg,
  },
  {
    id: 6,
    name: "Product 6",
    price: "$600",
    image: blackShirtImg,
  },
  {
    id: 7,
    name: "Product 7",
    price: "$700",
    image: blackShirtImg,
  },
  {
    id: 8,
    name: "Product 8",
    price: "$800",
    image: blackShirtImg,
  },
];

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

  return (
    <Section className={styles.popularProductsSection}>
      <Heading
        mainHeading="POPULAR PRODUCTS"
        subHeading="Explore some of our most popular products"
      />
      <Slider {...settings} className={styles.productSlider}>
        {dummyData.map((product) => (
          <PopularProductsCard
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
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
