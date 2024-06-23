import logo from "../images/PersonaLogo.png";
import { IoMdClose } from "react-icons/io";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import styles from "./Header.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import useWindowSize from "../hooks/useWindowSize";
import { useEffect, useState } from "react";

const Header = () => {
  const { mobile } = useWindowSize();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  useEffect(() => {
    if (!mobile) {
      setIsOpened(false);
    }
  }, [mobile]);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${isOpened ? styles.openResponsive : ""}`}>
        <div className={`${styles.navFilters} ${isOpened ? styles.show : ""}`}>
          <ul>
            <li>
              <p>MENS</p>
            </li>
            <li>
              <p>WOMANS</p>
            </li>
            <li>
              <p>KIDS</p>
            </li>
            <li>
              <p>ACCESSORIES</p>
            </li>
          </ul>
        </div>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.navActions}>
          <ul>
            <li>
              <FaShoppingCart />
              {mobile ? null : <p>CART</p>}
            </li>
            <li>
              <FaUser />
              {mobile ? null : <p>LOGIN</p>}
            </li>
          </ul>
        </div>

        <div
          className={`${styles.hamburger} ${
            isOpened ? styles.fixedPosition : ""
          }`}
          onClick={() => setIsOpened((prevState): boolean => !prevState)}
        >
          {isOpened ? <IoMdClose /> : <GiHamburgerMenu />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
