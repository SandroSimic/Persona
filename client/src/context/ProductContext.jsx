/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import {
  createProduct,
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
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product.");
      throw error;
    }
  };

  // Update product
  const updateProductCall = async (productId) => {
    try {
      const updatedProductData = {
        title: productData.title,
        price: productData.price,
        description: productData.description,
        category: productData.category,
        type: productData.type,
        priceDiscount: productData.discount || 0,
        sizes: productData.sizes,
        images: productData.images.map((image) => image.preview),
      };

      const totalAmount = productData.sizes.reduce(
        (acc, size) => acc + parseInt(size.qty || 0, 10),
        0
      );
      const totalPrice =
        productData.price -
        (productData.price * (productData.discount || 0)) / 100;

      updatedProductData.totalAmount = totalAmount;
      updatedProductData.totalPrice = totalPrice;

      updateProduct(updatedProductData, productId);
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
