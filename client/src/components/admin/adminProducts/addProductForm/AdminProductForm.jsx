/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import styles from "./AdminProductForm.module.scss";
import toast from "react-hot-toast";
import AdminProductImageForm from "./AdminProductImageForm";
import AdminProductsInfoForm from "./AdminProductsInfoForm";
import { useProduct } from "../../../../context/ProductContext";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../../../hooks/product/useGetProduct";
import { useEffect } from "react";

const AdminProductForm = ({ isEdit = false }) => {
  const { productData, setProductData, createProductCall, updateProductCall } =
    useProduct();

  const { productId } = useParams();
  const { data } = getProductDetail(productId);

  // Pre-fill form data for editing
  useEffect(() => {
    if (data && isEdit) {
      const product = data.data.doc;
      setProductData({
        title: product.title || "",
        price: product.price || "",
        description: product.description || "",
        category: product.category || "",
        type: product.type || "",
        discount: product.priceDiscount,
        sizes: product.sizes.map((size) => ({
          name: size.name,
          qty: size.qty,
        })),
        images: product.images.map((url) => ({ file: null, preview: url })),
      });
    }
  }, [data, isEdit]);

  const handleSubmit = async (e) => {
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

    try {
      if (isEdit) {
        // Update product
        await updateProductCall(productId);
      } else {
        // Create product

        await createProductCall();
      }

      // Reset productData after successful operation
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error(`Failed to ${isEdit ? "update" : "create"} product.`);
    }
  };

  return (
    <div className={styles.adminProductForm}>
      <div className={styles.adminProductHeader}>
        <h1>{isEdit ? "Edit Product" : "Add Product"}</h1>
        <button onClick={handleSubmit}>
          {isEdit ? "Update Product" : "Publish Product"}
        </button>
      </div>
      <form
        className={styles.productsForm}
        onSubmit={(e) => e.preventDefault()}
      >
        <AdminProductImageForm />
        <AdminProductsInfoForm />
      </form>
    </div>
  );
};

export default AdminProductForm;
