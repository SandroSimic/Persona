/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import styles from "./AdminProductForm.module.scss";
import toast from "react-hot-toast";
import AdminProductImageForm from "./AdminProductImageForm";
import AdminProductsInfoForm from "./AdminProductsInfoForm";
import { useProduct } from "../../../../context/ProductContext";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../../../hooks/product/useGetProduct";
import { useUpdateProduct } from "../../adminQueries/useUpdateProduct";
import { useCreateProduct } from "../../adminQueries/useCreateProduct";
import { useEffect } from "react";

const AdminProductForm = ({ isEdit = false }) => {
  const { createProductQuery } = useCreateProduct();
  const { updateProductQuery } = useUpdateProduct();
  const { productData, setProductData } = useProduct();

  const { productId } = useParams();
  const { data } = getProductDetail(productId);
  useEffect(() => {
    if (data) {
      if (isEdit) {
        const product = data.data.doc;
        console.log("product", product);
        setProductData({
          title: product.title || "",
          price: product.price || "",
          description: product.description || "",
          category: product.category || "", // Map to "Clothing"
          type: product.type || "", // Map to "Outerwear"
          discount: productData.priceDiscount,
          sizes: product.sizes.map((size) => ({
            name: size.name,
            qty: size.qty,
          })),
          images: product.images.map((url) => ({ file: null, preview: url })),
          hasDiscount: !!product.priceDiscount,
        });
      }
    }
  }, [data]);

  // console.log(data);

  // Pre-fill form data if editing
  // useEffect(() => {
  //   if (isEdit) {
  //     setProductData(productToEdit);
  //   }
  // }, [isEdit, productToEdit, setProductData]);
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

    // Transform the images array to match the backend's expectation
    const transformedImages = productData.images.map((image) => image.preview);

    const formData = {
      title: productData.title,
      price: productData.price,
      description: productData.description,
      category: productData.category,
      type: productData.type,
      priceDiscount: Number(productData.discount) || 0, // Send as priceDiscount and ensure it's a number
      sizes: productData.sizes,
      images: transformedImages,
    };

    if (isEdit) {
      updateProductQuery({ productData: formData, productId });
    } else {
      createProductQuery(formData);
    }

    setProductData({
      title: "",
      price: "",
      description: "",
      category: "",
      type: "",
      priceDiscount: "",
      sizes: [{ name: "", qty: "" }],
      images: [],
      hasDiscount: false,
    });
  };

  return (
    <div className={styles.adminProductForm}>
      <div className={styles.adminProductHeader}>
        <h1>{isEdit ? "Edit Product" : "Add Product"}</h1>
        <button onClick={handleSubmit}>
          {isEdit ? "Update Product" : "Publish Product"}
        </button>
      </div>
      <form className={styles.productsForm} onSubmit={handleSubmit}>
        <AdminProductImageForm />
        <AdminProductsInfoForm />
      </form>
    </div>
  );
};

export default AdminProductForm;
