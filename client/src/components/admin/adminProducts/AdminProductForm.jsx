import { useState } from "react";
import styles from "./AdminProductForm.module.scss";
import AdminProductImageForm from "./AdminProductImageForm";
import AdminProductsInfoForm from "./AdminProductsInfoForm";
import toast from "react-hot-toast";
import { useCreateProduct } from "../adminQueries/useCreateProduct";

const AdminProductForm = () => {
  const { createProductQuery } = useCreateProduct();

  // State for product data
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    type: "",
    discount: "",
    sizes: [{ name: "", qty: "" }],
    stock: [],
    images: [],
  });

  const handleImageUpdate = (images) => {
    setProductData((prev) => ({ ...prev, images }));
  };

  const handleInfoUpdate = (info) => {
    setProductData((prev) => ({ ...prev, ...info }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
    if (
      !productData.title ||
      !productData.price ||
      !productData.description ||
      !productData.category ||
      !productData.type ||
      productData.images.length === 0
    ) {
      toast.error("All fields and at least one image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("type", productData.type);
    console.log(formData);
    console.log(productData);
    productData.images.forEach((image) => {
      formData.append("images", image.file);
    });

    formData.append("stock", JSON.stringify(productData.stock));

    createProductQuery(formData);
  };

  return (
    <div className={styles.adminProductForm}>
      <div className={styles.adminProductHeader}>
        <h1>Add Product</h1>
        <button onClick={handleSubmit}>Publish Product</button>
      </div>
      <form className={styles.productsForm} onSubmit={handleSubmit}>
        <AdminProductImageForm onImageUpdate={handleImageUpdate} />
        <AdminProductsInfoForm
          onInfoUpdate={handleInfoUpdate}
          setProductData={setProductData}
          productData={productData}
        />
      </form>
    </div>
  );
};

export default AdminProductForm;
