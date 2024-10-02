import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";
import logo from "../../assets/logo.png";
import cartIcon from "../../assets/cart.png";
import userIcon from "../../assets/user.png";
const Navigation = () => {
  return (
    <div className={styles.header}>
      <ul className={styles.navList}>
        <li>
          <Link to="#">HOME</Link>
        </li>
        <li>
          <Link to="#">MENS</Link>
        </li>
        <li>
          <Link to="#">WOMANS</Link>
        </li>
        <li>
          <Link to="#">ACCESSORIES</Link>
        </li>
      </ul>
      <div>
        <img src={logo} />
      </div>
      <div className={styles.navActions}>
        <Link to="#">
          <img src={cartIcon} />
          CART
        </Link>
        <Link to="#">
          <img src={userIcon} />
          LOGIN
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
