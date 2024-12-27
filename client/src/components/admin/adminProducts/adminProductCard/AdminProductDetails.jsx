import { Link, useSearchParams } from "react-router-dom";
import styles from "./AdminProductDetails.module.scss";
import { getProductDetail } from "../../../../hooks/product/useGetProduct";
import { useEffect, useState } from "react";
import AdminProductDescription from "./AdminProductDescription";
import AdminProductInventory from "./AdminProductInventory";
import AdminProductPricing from "./AdminProductPricing";

// eslint-disable-next-line react/prop-types
function AdminProductDetails({ productId }) {
  const { data, isLoading, error } = getProductDetail(productId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const product = data?.data?.doc;
  const selectedTab = searchParams.get("tab") || "description";

  useEffect(() => {
    if (product) {
      setCurrentImageIndex(0);
    }
  }, [product]);

  const handleTabChange = (tab) => {
    setSearchParams({ id: product._id, tab });
  };

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
          onClick={() => {
            handleTabChange("description");
          }}
          className={selectedTab === "description" ? styles.active : ""}
        >
          Description
        </button>
        <button
          onClick={() => {
            handleTabChange("inventory");
          }}
          className={selectedTab === "inventory" ? styles.active : ""}
        >
          Inventory
        </button>
        <button
          onClick={() => {
            handleTabChange("pricing");
          }}
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

      {/* INFORMATION BASED ON BUTTON CLICKED */}
      {selectedTab === "description" && (
        <AdminProductDescription product={product} />
      )}
      {selectedTab === "inventory" && (
        <AdminProductInventory product={product} />
      )}

      {selectedTab === "pricing" && <AdminProductPricing product={product} />}

      <div className={styles.productActions}>
        <button className={styles.deleteBtn}>Delete</button>
        <Link className={styles.updateBtn} to={`${"/admin/products/edit/"}${productId}`}>Update product</Link>
      </div>
    </div>
  );
}

export default AdminProductDetails;
