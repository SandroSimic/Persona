/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AdminProductDetails.module.scss";
import { getProductDetail } from "../../../../hooks/product/useGetProduct";
import AdminProductDescription from "./AdminProductDescription";
import AdminProductInventory from "./AdminProductInventory";
import AdminProductPricing from "./AdminProductPricing";
import { useDeleteProduct } from "../../adminQueries/useDeleteProduct";
import Modal from "../../../ui/Modal";

function AdminProductDetails({ productId }) {
  const { data, isLoading, error } = getProductDetail(productId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("description"); // Use state for tabs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const product = data?.data?.doc;
  const { deleteProductQuery } = useDeleteProduct();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setCurrentImageIndex(0);
    }
  }, [product]);

  const handleNext = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product?.images.length
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product?.images.length - 1 : prevIndex - 1
    );
  };

  const handleDelete = async () => {
    deleteProductQuery(productId);
    navigate("/admin/products");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) {
    return (
      <div className={styles.productInfo}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.productInfo}>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <div className={styles.productInfo}>
      <div className={styles.productHeader}>
        <h1>{product.title}</h1>
        <Link to={`/product/${product._id}`}>See Full View</Link>
      </div>

      <div className={styles.productFilters}>
        <button
          onClick={() => setSelectedTab("description")}
          className={selectedTab === "description" ? styles.active : ""}
        >
          Description
        </button>
        <button
          onClick={() => setSelectedTab("inventory")}
          className={selectedTab === "inventory" ? styles.active : ""}
        >
          Inventory
        </button>
        <button
          onClick={() => setSelectedTab("pricing")}
          className={selectedTab === "pricing" ? styles.active : ""}
        >
          Pricing
        </button>
      </div>

      <div className={styles.carousel}>
        {product?.images?.length > 0 && (
          <div className={styles.carouselWrapper}>
            <button className={styles.carouselButton} onClick={handlePrev}>
              &#8249;
            </button>
            <img
              src={product.images[currentImageIndex]}
              alt={`Product Image ${currentImageIndex + 1}`}
              className={styles.carouselImage}
            />
            <button className={styles.carouselButton} onClick={handleNext}>
              &#8250;
            </button>
          </div>
        )}
      </div>

      {selectedTab === "description" && (
        <AdminProductDescription product={product} />
      )}
      {selectedTab === "inventory" && (
        <AdminProductInventory product={product} />
      )}
      {selectedTab === "pricing" && <AdminProductPricing product={product} />}

      <div className={styles.productActions}>
        <button className={styles.deleteBtn} onClick={openModal}>
          Delete
        </button>
        <Link
          className={styles.updateBtn}
          to={`${"/admin/products/edit/"}${productId}`}
        >
          Update product
        </Link>
      </div>

      <Modal
        isOpen={isModalOpen}
        title="Are you sure?"
        message="Do you really want to delete this product? This action cannot be undone."
        onClose={closeModal}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default AdminProductDetails;
