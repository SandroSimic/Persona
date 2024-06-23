import styles from "./Product.module.scss";
import dummyImg from "../images/greenHoodie.png";
import userDummyImg from "../images/hoodies.png";
import starImg from "../images/Star.png";
import { FaRegHeart } from "react-icons/fa";
const Product = () => {
  return (
    <section className={styles.product}>
      <div className={styles.wrapper}>
        <div className={styles.images}>
          <div className={styles.sideImages}>
            <img src={dummyImg} />
            <img src={dummyImg} />
            <img src={dummyImg} />
            <img src={dummyImg} />
            <img src={dummyImg} />
          </div>
          <div className={styles.mainImage}>
            <img src={dummyImg} />
          </div>
        </div>
        <div className={styles.productText}>
          <div className={styles.user}>
            <div className={styles.userImageWrapper}>
              <img src={userDummyImg} />
            </div>
            <p>Sandro</p>
          </div>
          <div className={styles.mainText}>
            <h1>Nike Air Force 1 ` 07</h1>
            <div className={styles.mainRating}>
              <div>
                <p>Category</p>
                <div className={styles.stars}>
                  <img src={starImg} />
                  <img src={starImg} />
                  <img src={starImg} />
                  <img src={starImg} />
                  <img src={starImg} />
                  <p>32 reviews</p>
                </div>
              </div>
              <span>$155.00</span>
            </div>
          </div>
          <div className={styles.variants}>
            <p>Select Size</p>
            <div className={styles.variantsList}>
              <div>
                <span>S</span>
              </div>
              <div>
                <span>M</span>
              </div>
              <div>
                <span>L</span>
              </div>
              <div>
                <span>XL</span>
              </div>
              <div>
                <span>2XL</span>
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <button>Add to Cart</button>
            <div>
              <FaRegHeart />
            </div>
          </div>
        </div>
      </div>

      {/* TODO ADD REVIEWS AND DESCRIPTION */}
    </section>
  );
};

export default Product;
