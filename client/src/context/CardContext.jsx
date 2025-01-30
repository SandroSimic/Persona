/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { addToCart } from "../components/api/cartApi";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState({
    items: [],
    cartQuantity: 0,
    cartLoading: false,
    getCartLoading: false,
    addToCartLoading: false,
    removeFromCartLoading: false,
  });

  const addProductToCart = async (productId, selectedSize, quantity) => {
    setCartData({ ...cartData, addToCartLoading: true });

    try {
      const data = await addToCart(productId, selectedSize, quantity); // Call the API utility function

      if (data && data.cart) {
        setCartData({
          ...cartData,
          items: data.cart.products,
          cartQuantity: data.cart.products.reduce(
            (total, item) => total + item.quantity,
            0
          ),
          addToCartLoading: false,
        });
        toast.success("Product added to cart.");
      } else {
        throw new Error("Failed to add product to cart.");
      }
    } catch (error) {
      toast.error(error.message || "Error adding product to cart.");
      setCartData({ ...cartData, addToCartLoading: false });
    }
  };

  return (
    <CartContext.Provider value={{ addProductToCart, cartData }}>
      {children}
    </CartContext.Provider>
  );
};
