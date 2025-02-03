import { useState } from "react";
import OrderCart from "../components/order/OrderCart";
import OrderDelivery from "../components/order/OrderDelivery";
import styles from "./OrderPage.module.scss";
import { getCart } from "../hooks/cart/useGetCart";

function OrderPage() {
  const { data: cart } = getCart();
  const [orderData, setOrderData] = useState({
    cart: cart?.data?.cart?._id,
    name: "",
    surname: "",
    zipCode: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  return (
    <div className={styles.orderPageContainer}>
      <div className={styles.orderPage}>
        <OrderDelivery
          orderData={orderData}
          setOrderData={setOrderData}
          errors={errors}
          setErrors={setErrors}
        />
        <OrderCart
          orderData={orderData}
          setOrderData={setOrderData}
          errors={errors}
          setErrors={setErrors}
        />
      </div>
    </div>
  );
}

export default OrderPage;
