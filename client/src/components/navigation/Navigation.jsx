import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";
import logo from "../../assets/logo.png";
import cartIcon from "../../assets/cart.png";
import userIcon from "../../assets/user.png";
import { useState } from "react";

const Navigation = () => {
  const [isOpenRes, setIsOpenRes] = useState(false);

  const handleOpenRes = () => {
    setIsOpenRes(!isOpenRes);
  };

  return (
    <div className={styles.header}>
      <ul className={`${styles.navList} ${isOpenRes ? styles.open : ""}`}>
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
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={styles.navActions}>
        <Link to="#">
          <img src={cartIcon} alt="Cart" />
          CART
        </Link>
        <Link to="#">
          <img src={userIcon} alt="User" />
          LOGIN
        </Link>
      </div>
      <div
        className={`${styles.hamburger} ${isOpenRes ? styles.open : ""}`}
        onClick={handleOpenRes}
      >
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Navigation;
