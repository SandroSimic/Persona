/* eslint-disable react/prop-types */
import { getCart } from "../../hooks/cart/useGetCart";
import { useCreateOrder } from "../../hooks/order/useCreateOrder";
import ProductCardDrawer from "../product/ProductCardDrawer";
import styles from "./OrderCart.module.scss";

function OrderCart({ orderData, setOrderData, setErrors }) {
  const { data: cart, isLoading } = getCart();
  const mutation = useCreateOrder();
  const productsInCart = cart?.data?.cart?.products || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleConfirmOrder = () => {
    const newErrors = {};
    if (!orderData.name) newErrors.name = "Field is required";
    if (!orderData.surname) newErrors.surname = "Field is required";
    if (!orderData.email) newErrors.email = "Field is required";
    if (!orderData.phone) newErrors.phone = "Field is required";
    if (!orderData.country) newErrors.country = "Field is required";
    if (!orderData.city) newErrors.city = "Field is required";
    if (!orderData.address) newErrors.address = "Field is required";
    if (!orderData.zipCode) newErrors.zipCode = "Field is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    mutation.mutate(orderData);

    setOrderData({
      ...orderData,
      name: "",
      surname: "",
      zipCode: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      address: "",
    });
    setErrors({});
  };

  return (
    <div className={styles.orderCart}>
      <h2>Order Summary</h2>
      <div className={styles.orderCartContent}>
        {productsInCart.length === 0 ? (
          <div className={styles.noProductsFound}>No products found</div>
        ) : (
          <div className={styles.products}>
            {productsInCart.map((product) => (
              <div key={product._id} className={styles.product}>
                <ProductCardDrawer product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      {productsInCart.length > 0 && (
        <div className={styles.orderCartActions}>
          <span>Total Amount: {cart.data.cart.totalPrice.toFixed(2)}$</span>
          <button onClick={handleConfirmOrder}>Confirm Order</button>
        </div>
      )}
    </div>
  );
}

export default OrderCart;
