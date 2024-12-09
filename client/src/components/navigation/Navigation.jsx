import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styles from "./Navigation.module.scss";
import logo from "../../assets/logo.png";
import cartIcon from "../../assets/cart.png";
import userIcon from "../../assets/user.png";
import { useLoggedInUser } from "../login/useGetLoggedInUser";
import { useLogout } from "../login/useLogout";

const Navigation = () => {
  const [isOpenRes, setIsOpenRes] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { data, isLoading } = useLoggedInUser();
  const userMenuRef = useRef(null);
  const { logout } = useLogout();

  const handleOpenRes = () => {
    setIsOpenRes(!isOpenRes);
  };

  const handleOpenUserMenu = () => {
    setOpenUserMenu(!openUserMenu);
  };

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setOpenUserMenu(false);
    }
  };

  useEffect(() => {
    if (openUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openUserMenu]);

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
        {isLoading ? (
          <SkeletonLoader />
        ) : data?.user ? (
          <img
            src={data?.user?.userImage}
            className={styles.userProfile}
            alt="User Profile"
            onClick={handleOpenUserMenu}
          />
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

      {openUserMenu && (
        <div className={styles.userOptions} ref={userMenuRef}>
          <button className={styles.profileBtn}>Profile</button>
          {data
            ? data.user?.isAdmin && (
                <button className={styles.profileBtn}>
                  <Link to="/admin">Admin</Link>
                </button>
              )
            : null}

          <button className={styles.logoutBtn} onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export const SkeletonLoader = () => {
  return (
    <div className={styles.skeletonProfile}>
      {/* Skeleton structure for the loading user image */}
    </div>
  );
};

export default Navigation;
