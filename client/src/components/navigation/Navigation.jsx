import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styles from "./Navigation.module.scss";
import logo from "../../assets/logo.png";
import cartIcon from "../../assets/cart.png";
import userIcon from "../../assets/user.png";
import { useLoggedInUser } from "../login/useGetLoggedInUser";
import { useLogout } from "../login/useLogout";
import Drawer from "../ui/Drawer";

const Navigation = () => {
  const [isOpenRes, setIsOpenRes] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
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

  const handleCartClick = () => {
    setIsCartDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsCartDrawerOpen(false);
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
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/products?category=Man">MENS</Link>
        </li>
        <li>
          <Link to="/products?category=Woman">WOMANS</Link>
        </li>
        <li>
          <Link to="/products?category=Kids">KIDS</Link>
        </li>
      </ul>
      <Link to={"/"} className={styles.logo}>
        <img src={logo} alt="Logo" />
      </Link>
      <div className={styles.navActions}>
        <button onClick={handleCartClick} className={styles.cartButton}>
          <img src={cartIcon} alt="Cart" />
          CART
        </button>
        {isLoading ? (
          <SkeletonLoader />
        ) : data?.user ? (
          <div style={{ position: "relative" }}>
            <img
              src={data?.user?.userImage}
              className={styles.userProfile}
              alt="User Profile"
              onClick={handleOpenUserMenu}
            />
            {openUserMenu && (
              <div className={styles.userOptions} ref={userMenuRef}>
                <Link to="/profile" className={styles.profileBtn}>
                  <span>Profile</span>
                </Link>
                {data
                  ? data.user?.isAdmin && (
                      <Link to="/admin" className={styles.profileBtn}>
                        <span>Admin</span>
                      </Link>
                    )
                  : null}

                <button className={styles.logoutBtn} onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>
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

      <Drawer
        isOpen={isCartDrawerOpen}
        onClose={handleDrawerClose}
        position="right"
      >
        <div className={styles.cartDrawer}>
          <div className={styles.cartHeader}>
            <h2>Your Cart</h2>
            <div>Items</div>
          </div>
          <div className={styles.cartFooter}>Details</div>
        </div>
      </Drawer>
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
