/* eslint-disable react/prop-types */

import styles from "./AdminProductInventory.module.scss";

const AdminProductInventory = ({ product }) => {
  return (
    <div className={styles.adminProductInventory}>
      <h2>Inventory</h2>
      <div className={styles.inventory}>
        <p>Available Sizes</p>
        <div className={styles.sizes}>
          {product?.sizes?.map((size) => (
            <div key={size._id} className={styles.size}>
              <p>{size.name}</p>
              <span>({size.qty})</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.totalStock}>
        <p>Total Stock</p>
        <span>{product.totalAmount}</span>
      </div>
    </div>
  );
};

export default AdminProductInventory;
