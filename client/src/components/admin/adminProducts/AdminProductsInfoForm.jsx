/* eslint-disable react/prop-types */
import { useState } from "react";
import Input from "../../ui/Input";
import styles from "./AdminProductsInfoForm.module.scss";

function AdminProductsInfoForm({ productData, setProductData }) {
  const [isDiscountAdded, setIsDiscountAdded] = useState(false);

  // Handle size addition
  const handleAddSize = () => {
    setProductData([...productData.sizes, { name: "", quantity: "" }]);
  };

  // Handle size changes
  const handleSizeChange = (index, field, value) => {
    const updatedSizes = productData.sizes.map((size, i) =>
      i === index ? { ...size, [field]: value } : size
    );
    setProductData(updatedSizes);
  };

  // Toggle discount field
  const toggleDiscount = () => {
    setIsDiscountAdded(!isDiscountAdded);
    if (!isDiscountAdded) {
      setProductData(""); // Clear discount if removed
    }
  };

  // Calculate discounted price
  // const calculateDiscountedPrice = () => {
  //   const numericPrice = parseFloat(productData.price);
  //   const numericDiscount = parseFloat(productData.discount);
  //   if (!isNaN(numericPrice) && !isNaN(numericDiscount)) {
  //     return (numericPrice * (1 - numericDiscount / 100)).toFixed(2);
  //   }
  //   return "";
  // };

  return (
    <div className={styles.productFormInfo}>
      <div>
        <h2>Product Name</h2>
        <Input
          type="text"
          name="title"
          value={productData.title}
          onChange={(e) =>
            setProductData({ ...productData, title: e.target.value })
          }
        />
      </div>
      <div>
        <h2>Category</h2>
        <select
          name="category"
          value={productData.category}
          onChange={(e) =>
            setProductData({ ...productData, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          <option value="Test">Test</option>
          <option value="Category">Category</option>
          <option value="AnotherCategory">Another Category</option>
        </select>
      </div>
      <div>
        <h2>Type</h2>
        <select
          name="type"
          value={productData.type}
          onChange={(e) =>
            setProductData({ ...productData, type: e.target.value })
          }
        >
          <option value="">Select Type</option>
          <option value="Test">Test</option>
          <option value="Type1">Type 1</option>
          <option value="Type2">Type 2</option>
        </select>
      </div>
      <div>
        <h2>Description</h2>
        <textarea
          name="description"
          placeholder="Description"
          rows={10}
          value={productData.description}
          onChange={(e) =>
            setProductData({ ...productData, description: e.target.value })
          }
        />
      </div>
      <div>
        <h2>Sizes</h2>
        <div className={styles.sizesWrapper}>
          {productData.sizes.map((size, index) => (
            <div className={styles.size} key={index}>
              <input
                type="text"
                className={styles.sizeName}
                value={size.name}
                placeholder="Size Name (e.g., MD)"
                onChange={(e) =>
                  handleSizeChange(index, "name", e.target.value)
                }
              />
              <input
                type="number"
                className={styles.sizeQuantity}
                value={size.quantity}
                placeholder="Quantity"
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
              value={productData.price}
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
              className={styles.priceInput}
            />
          </div>
          {isDiscountAdded && (
            <div className={styles.discountInput}>
              <h2>Discount (%)</h2>
              <Input
                type="number"
                value={productData.discount}
                onChange={(e) =>
                  setProductData({ ...productData, discount: e.target.value })
                }
              />
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
