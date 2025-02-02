/* eslint-disable react/prop-types */
import styles from "./OrderDelivery.module.scss";
import { COUNTRIES } from "../../utils/constants";

function OrderDelivery({ orderData, setOrderData, errors, setErrors }) {
  const handleChange = (field) => (e) => {
    setOrderData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className={styles.orderDelivery}>
      <h2>Delivery Information</h2>
      <form className={styles.orderDeliveryForm}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={orderData.name}
            onChange={handleChange("name")}
            className={errors.name ? styles.errorBorder : {}}
          />
          {errors.name && (
            <span className={styles.errorMessage}>Field is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={orderData.surname}
            onChange={handleChange("surname")}
            className={errors.surname ? styles.errorBorder : {}}
          />
          {errors.surname && (
            <span className={styles.errorMessage}>Field is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={orderData.email}
            onChange={handleChange("email")}
            className={errors.email ? styles.errorBorder : {}}
          />
          {errors.email && (
            <span className={styles.errorMessage}>Field is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={orderData.phone}
            onChange={handleChange("phone")}
            className={errors.phone ? styles.errorBorder : {}}
          />
          {errors.phone && (
            <span className={styles.errorMessage}>Field is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={orderData.country}
            onChange={handleChange("country")}
            className={errors.country ? styles.errorBorder : {}}
          >
            <option value="">Select a country</option>
            {COUNTRIES.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <span className={styles.errorMessage}>Field is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={orderData.city}
            onChange={handleChange("city")}
            className={errors.city ? styles.errorBorder : {}}
          />
          {errors.city && (
            <span className={styles.errorMessage}>Field is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={orderData.address}
            onChange={handleChange("address")}
            className={errors.address ? styles.errorBorder : {}}
          />
          {errors.address && (
            <span className={styles.errorMessage}>Field is required</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="zip">Zip Code:</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={orderData.zipCode}
            onChange={handleChange("zipCode")}
            className={errors.zipCode ? styles.errorBorder : {}}
          />
          {errors.zipCode && (
            <span className={styles.errorMessage}>Field is required</span>
          )}
        </div>
      </form>
    </div>
  );
}

export default OrderDelivery;
