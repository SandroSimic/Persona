import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";
import logo from "../../assets/logo.png";
import cartIcon from "../../assets/cart.png";
import userIcon from "../../assets/user.png";
import { useState } from "react";
import { useLoggedInUser } from "../login/useGetLoggedInUser";

const Navigation = () => {
  const [isOpenRes, setIsOpenRes] = useState(false);
  const { data, error, isLoading } = useLoggedInUser();

  console.log(data, error, isLoading);

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
        {data?.user ? (

          <img src={data?.user?.userImage} style={{
            width: "30px",
            height: "30px",
          }}/>
        ) : (
          <Link to="/login">
            <img src={userIcon} alt="User" />
            LOGIN
          </Link>
        )}
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
