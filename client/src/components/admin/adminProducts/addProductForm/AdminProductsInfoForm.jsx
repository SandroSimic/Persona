import { useEffect } from "react";
import { useProduct } from "../../../../context/ProductContext";
import Input from "../../../ui/Input";
import styles from "./AdminProductsInfoForm.module.scss";

const AdminProductsInfoForm = () => {
  const {
    productData,
    handleAddSize,
    handleRemoveSize,
    setProductData,
    handleSizeChange,
    toggleDiscount,
    calculateDiscountedPrice,
  } = useProduct();


  useEffect(() => {
    if (productData.discount > 0) {
      setProductData((prev) => ({ ...prev, hasDiscount: true }));
    }
  }, []);

  return (
    <div className={styles.productFormInfo}>
      {/* Product Name */}
      <div>
        <h2>Product Name</h2>
        <Input
          type="text"
          value={productData.title}
          onChange={(e) =>
            setProductData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>

      {/* Category */}
      <div>
        <h2>Category</h2>
        <select
          name="category"
          defaultValue={productData.category || ""}
          value={productData.category || ""}
          onChange={(e) =>
            setProductData((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <option value="">Select Category</option>
          <option value="man">Man</option>
          <option value="woman">Woman</option>
          <option value="kid">Kids</option>
        </select>
      </div>

      {/* Type */}
      <div>
        <h2>Type</h2>
        <select
          name="type"
          value={productData.type}
          onChange={(e) =>
            setProductData((prev) => ({ ...prev, type: e.target.value }))
          }
        >
          <option value="">Select Type</option>
          <option value="hoodie">Hoodie</option>
          <option value="pants">Pants</option>
          <option value="accessorie">Accessorie</option>
          <option value="shirt">Shirt</option>
          <option value="sneaker">Sneakers</option>
          <option value="jacket">Jacket</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <h2>Description</h2>
        <textarea
          name="description"
          placeholder="Description"
          rows={10}
          value={productData.description}
          onChange={(e) =>
            setProductData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      {/* Sizes */}
      <div>
        <h2>Sizes</h2>
        <div className={styles.sizesWrapper}>
          {productData.sizes.map((sizeObj, index) => (
            <div key={index} className={styles.size}>
              <input
                type="text"
                value={sizeObj.name}
                placeholder="Size Name"
                className={styles.sizeName}
                onChange={(e) =>
                  handleSizeChange(index, "name", e.target.value)
                }
              />
              <input
                type="number"
                value={sizeObj.qty}
                className={styles.sizeQuantity}
                placeholder="Quantity"
                onChange={(e) => handleSizeChange(index, "qty", e.target.value)}
              />
              <button onClick={() => handleRemoveSize(index)}>
                <span>X</span>
              </button>
            </div>
          ))}
          <div className={styles.addNewSize} onClick={handleAddSize}>
            <div>+</div>
          </div>
        </div>
      </div>

      {/* Price and Discount */}
      <div className={styles.priceWrapper}>
        <div className={styles.prices}>
          {/* Price */}
          <div>
            <h2>Price</h2>
            <Input
              type="number"
              value={productData.price}
              onChange={(e) =>
                setProductData((prev) => ({ ...prev, price: e.target.value }))
              }
              className={styles.priceInput}
            />
          </div>

          {/* Discount */}
          {productData.discount && (
            <div className={styles.discountInput}>
              <h2>Discount (%)</h2>
              <Input
                type="number"
                value={productData.discount}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    discount: e.target.value,
                  }))
                }
              />
            </div>
          )}

          {productData.discount && (
            <div className={styles.discountedPrice}>
              <h2>Discounted Price</h2>
              <p>{calculateDiscountedPrice() || "N/A"}</p>
            </div>
          )}
        </div>
        <button type="button" onClick={toggleDiscount}>
          {productData.discount ? "Remove Discount" : "Add Discount"}
        </button>
      </div>
    </div>
  );
};

export default AdminProductsInfoForm;
