/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

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
    hasDiscount: false
  });

  // Handle size addition
  const handleAddSize = () => {
    setProductData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { name: "", qty: "" }],
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
    console.log(productData.hasDiscount);
  };

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

  // Remove image
  const removeImage = (index) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  return (
    <ProductContext.Provider
      value={{
        productData,
        setProductData,
        handleAddSize,
        handleSizeChange,
        toggleDiscount,
        addImages,
        removeImage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
