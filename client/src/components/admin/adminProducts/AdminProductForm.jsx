import styles from "./AdminProductForm.module.scss";
import AdminProductImageForm from "./AdminProductImageForm";
import AdminProductsInfoForm from "./AdminProductsInfoForm";
import toast from "react-hot-toast";
import { useCreateProduct } from "../adminQueries/useCreateProduct";
import { useProduct } from "../../../context/ProductContext";

const AdminProductForm = () => {
  const { createProductQuery } = useCreateProduct();
  const { productData, setProductData } = useProduct();

  const handleSubmit = (e) => {
    e.preventDefault();

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

    // Prepare form data
    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("type", productData.type);

    productData.images.forEach((image) => {
      formData.append("images", image.file);
    });

    if (productData.discount) {
      formData.append("priceDiscount", productData.discount); // Send only if discount is provided
    }

    formData.append("sizes", JSON.stringify(productData.sizes));

    // Send form data
    createProductQuery(formData);
    setProductData({
      title: "",
      price: "",
      description: "",
      category: "",
      type: "",
      discount: "",
      sizes: [{ name: "", qty: "" }], // Default size structure
      images: [],
      hasDiscount: false,
    });
  };

  return (
    <div className={styles.adminProductForm}>
      <div className={styles.adminProductHeader}>
        <h1>Add Product</h1>
        <button onClick={handleSubmit}>Publish Product</button>
      </div>
      <form className={styles.productsForm} onSubmit={handleSubmit}>
        <AdminProductImageForm />
        <AdminProductsInfoForm />
      </form>
    </div>
  );
};

export default AdminProductForm;
