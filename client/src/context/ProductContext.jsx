/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "./../components/admin/adminApi/adminApi";
import { getProduct } from "../components/api/productApi";

// Create Product Context
const ProductContext = createContext();

// Create a custom hook to use the ProductContext
export const useProduct = () => useContext(ProductContext);

// Create the ProductProvider
export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState({
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

  const calculateDiscountedPrice = () => {
    const price = parseFloat(productData.price);
    const discount = parseFloat(productData.discount);
    return (price * (1 - discount / 100)).toFixed(2);
  };

  // Handle size addition
  const handleAddSize = () => {
    setProductData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { name: "", qty: "" }],
    }));
  };

  const handleRemoveSize = (index) => {
    setProductData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
  };

  // Handle size changes
  const handleSizeChange = (index, field, value) => {
    setProductData((prev) => ({
      ...prev,
      sizes: prev.sizes.map((sizeObj, i) =>
        i === index ? { ...sizeObj, [field]: value } : sizeObj
      ),
    }));
  };

  // Toggle discount
  const toggleDiscount = () => {
    setProductData((prev) => ({
      ...prev,
      hasDiscount: !prev.hasDiscount,
    }));
  };

  // Add new images
  const addImages = (newImages) => {
    setProductData((prev) => {
      const updatedImages = [...prev.images, ...newImages];
      if (updatedImages.length > 6) {
        alert("You can upload a maximum of 6 images.");
        return prev;
      }
      return { ...prev, images: updatedImages };
    });
  };

  // Remove an image
  const removeImage = (index) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const getProductDetail = async (productId) => {
    getProduct(productId);
  };

  // Create product
  const createProductCall = async () => {
    try {
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("price", productData.price);
      formData.append("description", productData.description);
      formData.append("category", productData.category);
      formData.append("type", productData.type);
      formData.append("priceDiscount", productData.discount || 0);
      formData.append("sizes", JSON.stringify(productData.sizes));

      productData.images.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file);
        }
      });

      createProduct(formData);
      toast.success("Product created successfully!");
    } catch (error) {
      toast.error("Failed to create product.");
      throw error;
    }
  };

  const deleteProductCall = async (productId) => {
    try {
      deleteProduct(productId);
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product.");
      throw error;
    }
  };

  // Update product
  const updateProductCall = async (productId) => {
    try {
      const formData = new FormData();

      // Add all product data to FormData as strings
      formData.append("title", productData.title || "");
      formData.append("price", productData.price.toString() || "0");
      formData.append("description", productData.description || "");
      formData.append("category", productData.category || "");
      formData.append("type", productData.type || "");
      formData.append("priceDiscount", (productData.discount || 0).toString());
      formData.append("sizes", JSON.stringify(productData.sizes || []));

      // Add images
      productData.images.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file); // New images
        } else {
          formData.append("images", image.preview); // Existing images
        }
      });

      // Calculate totals
      const totalAmount = productData.sizes.reduce(
        (acc, size) => acc + parseInt(size.qty || 0, 10),
        0
      );
      const totalPrice =
        productData.price -
        (productData.price * (productData.discount || 0)) / 100;

      formData.append("totalAmount", totalAmount.toString());
      formData.append("totalPrice", totalPrice.toString());

      // Call the updateProduct API
      await updateProduct(formData, productId);

      // Reset productData after successful update
      setProductData({
        title: "",
        price: "",
        description: "",
        category: "",
        type: "",
        discount: "",
        sizes: [{ name: "", qty: "" }],
        images: [],
        hasDiscount: false,
      });

      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        productData,
        setProductData,
        handleAddSize,
        handleRemoveSize,
        handleSizeChange,
        toggleDiscount,
        addImages,
        removeImage,
        calculateDiscountedPrice,
        createProductCall,
        updateProductCall,
        getProductDetail,
        deleteProductCall,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
