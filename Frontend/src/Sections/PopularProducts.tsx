import Heading from "../components/UI/Heading";
import hoodieImg from "../images/greenHoodie.png";
import styles from "./PopularProducts.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import SlidingProduct from "../components/popularProducts/SlidingProduct";
import useWindowSize from "../hooks/useWindowSize";

const products = [
  {
    id: 1,
    image: hoodieImg,
    text: "Hummle green hoodie",
    price: "49.99",
  },
  {
    id: 2,
    image: hoodieImg,
    text: "Hummle green hoodie",
    price: "49.99",
  },
  {
    id: 3,
    image: hoodieImg,
    text: "Hummle green hoodie",
    price: "49.99",
  },
  {
    id: 4,
    image: hoodieImg,
    text: "Hummle green hoodie",
    price: "49.99",
  },
  {
    id: 5,
    image: hoodieImg,
    text: "Hummle green hoodie",
    price: "49.99",
  },
  {
    id: 6,
    image: hoodieImg,
    text: "Hummle green hoodie",
    price: "49.99",
  },
];

const PopularProducts = () => {


  const {mobile, tablet} = useWindowSize()

  return (
    <section className={styles.popularProductsSection}>
      <Heading
        mainText="POPULAR PRODUCTS"
        subText="Explore some of our most popular products"
      />
      <div className={styles.popularProducts}>
        <Swiper
          slidesPerView={mobile ? 1 : tablet ? 2 : 4}
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode, Navigation]}
          loop={true}
          navigation={true}
          className={styles.swiperContainer}
        >
          {products.map((product, index) => (
            <SwiperSlide className={styles.slide}>
              <SlidingProduct key={index} id={product.id} image={product.image} price={product.price} text={product.text} />
            </SwiperSlide>
          )) }
        </Swiper>
      </div>
      <button className={styles.popularProductsBtn}>View All Products</button>
    </section>
  );
};

export default PopularProducts;
