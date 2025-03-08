import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styles from "./Navigation.module.scss";
import logo from "../../assets/logo.png";
import cartIcon from "../../assets/cart.png";
import userIcon from "../../assets/user.png";
import { useLoggedInUser } from "../login/useGetLoggedInUser";
import { useLogout } from "../login/useLogout";
import Drawer from "../ui/Drawer";
import { getCart } from "../../hooks/cart/useGetCart";
import ProductCardDrawer from "../product/ProductCardDrawer";
import { useClearCart } from "../../hooks/cart/useClearCart";

const Navigation = () => {
  const [isOpenRes, setIsOpenRes] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const { data, isLoading } = useLoggedInUser();
  const { data: cartData } = getCart();
  const { logout } = useLogout();

  console.log("cartData", cartData);

  const clearCart = useClearCart();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

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

  const handleNavigateToOrder = () => {
    navigate("/order");
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

  const cartProducts = cartData?.data?.cart?.products;

  return (
    <div className={styles.header}>
      <ul className={`${styles.navList} ${isOpenRes ? styles.open : ""}`}>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/products">PRODUCTS</Link>
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
        {data?.user && (
          <button onClick={handleCartClick} className={styles.cartButton}>
            <img src={cartIcon} alt="Cart" />
            {cartData?.data?.cart.totalAmountOfProducts > 0 && (
              <div className={styles.cartCount}>
                <span>{cartData?.data?.cart.totalAmountOfProducts}</span>
              </div>
            )}
          </button>
        )}
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
                {data && data.user?.isAdmin && (
                  <Link to="/admin" className={styles.profileBtn}>
                    <span>Admin</span>
                  </Link>
                )}
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
            {cartProducts?.length === 0 || cartProducts === undefined ? (
              <div className={styles.emptyCart}>Your cart is empty</div>
            ) : (
              <div className={styles.cartItems}>
                {cartProducts?.map((product) => (
                  <ProductCardDrawer product={product} key={product._id} />
                ))}
              </div>
            )}
          </div>
          {cartProducts?.length > 0 && (
            <div className={styles.cartFooter}>
              <div className={styles.cartTotal}>
                <div className={styles.totalPrice}>
                  <p>Amount Price:</p>
                  <span>${cartData?.data?.cart.totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleNavigateToOrder}
                  className={styles.checkoutBtn}
                >
                  <p>Checkout</p>
                  <span>{cartData?.data?.cart.totalAmountOfProducts}</span>
                </button>
              </div>
              <div className={styles.cartActions}>
                <button
                  className={styles.emptyCartBtn}
                  onClick={clearCart.mutate}
                >
                  Empty Cart
                </button>
              </div>
            </div>
          )}
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
