import { FaRegHeart } from 'react-icons/fa';
import styles from './SlidingProduct.module.scss';
import { Link } from 'react-router-dom';

type SlidingProductProps = {
  id: number;
  image: string;
  text: string;
  price: string;
};

const SlidingProduct = ({image, text,price, id}: SlidingProductProps) => {
  return (
    <Link className={styles.product} to={`/product/${id}`}>
      <div className={styles.productImage}>
        <img src={image} alt={text} />
        <div className={styles.like}>
          <FaRegHeart />
        </div>
      </div>
      <div className={styles.productInfo}>
        <h3>{text}</h3>
        <p>${price}</p>
      </div>
    </Link>
  );
};

export default SlidingProduct;
