import  { useState } from "react";
import Input from "../../ui/Input";
import styles from "./AdminProductsInfoForm.module.scss";

function AdminProductsInfoForm() {
  const [sizes, setSizes] = useState([{ name: "", quantity: "" }]);
  const [isDiscountAdded, setIsDiscountAdded] = useState(false);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const handleAddSize = () => {
    setSizes([...sizes, { name: "", quantity: "" }]);
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = sizes.map((size, i) =>
      i === index ? { ...size, [field]: value } : size
    );
    setSizes(updatedSizes);
  };

  const toggleDiscount = () => {
    setIsDiscountAdded(!isDiscountAdded);
    if (!isDiscountAdded) {
      setDiscount(""); // Clear discount when it's removed
    }
  };

  const calculateDiscountedPrice = () => {
    const numericPrice = parseFloat(price);
    const numericDiscount = parseFloat(discount);
    if (!isNaN(numericPrice) && !isNaN(numericDiscount)) {
      return (numericPrice * (1 - numericDiscount / 100)).toFixed(2);
    }
    return "";
  };

  return (
    <div className={styles.productFormInfo}>
      <div>
        <h2>Product Name</h2>
        <Input type={"text"} onChange={(e) => console.log(e.target.value)} />
      </div>
      <div>
        <h2>Category</h2>
        <select>
          <option value="1">Test</option>
          <option value="2">Category</option>
          <option value="3">Category</option>
          <option value="4">Category</option>
        </select>
      </div>
      <div>
        <h2>Type</h2>
        <select>
          <option value="1">Test</option>
          <option value="2">Category</option>
          <option value="3">Category</option>
          <option value="4">Category</option>
        </select>
      </div>
      <div>
        <h2>Description</h2>
        <textarea placeholder="Description" rows={10} />
      </div>
      <div>
        <h2>Sizes</h2>
        <div className={styles.sizesWrapper}>
          {sizes.map((size, index) => (
            <div className={styles.size} key={index}>
              <input
                type="text"
                className={styles.sizeName}
                value={size.name}
                placeholder="MD"
                onChange={(e) =>
                  handleSizeChange(index, "name", e.target.value)
                }
              />
              <input
                type="text"
                className={styles.sizeQuantity}
                value={size.quantity}
                placeholder="10"
                onChange={(e) =>
                  handleSizeChange(index, "quantity", e.target.value)
                }
              />
            </div>
          ))}
          <div className={styles.addNewSize} onClick={handleAddSize}>
            <div>+</div>
          </div>
        </div>
      </div>
      <div className={styles.priceWrapper}>
        <div className={styles.prices}>
          <div>
            <h2>Price</h2>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={styles.priceInput}
            />
          </div>
          {isDiscountAdded && (
            <div className={styles.discountInput}>
              <h2>Discount (%)</h2>
              <Input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          )}
          {isDiscountAdded && (
            <div className={styles.discountInput}>
              <h2>Full Price</h2>
              <Input type="text" value={calculateDiscountedPrice()} readOnly />
            </div>
          )}
        </div>
        <button type="button" onClick={toggleDiscount}>
          {isDiscountAdded ? "Remove Discount" : "Add Discount"}
        </button>
      </div>
    </div>
  );
}

export default AdminProductsInfoForm;
