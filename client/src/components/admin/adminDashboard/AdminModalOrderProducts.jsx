/* eslint-disable react/prop-types */
import { getProductDetail } from "../../../hooks/product/useGetProduct";
import styles from "./AdminModalOrderProducts.module.scss";

function AdminModalOrderProducts({ product }) {
  const { data, isLoading } = getProductDetail(product.productId);

  if (isLoading) {
    return <div>Loading...</div>;
  }



  return (
    <div className={styles.AdminModalProductContainer}>
      <div className={styles.productHeader}>
        <div className={styles.productImage}>
          <img src={data.data.doc.images[0]} />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.productInfoText}>
            <h3>
              {data.data.doc.title} ({product.selectedSize}) (
              {product.selectedSizeQty})
            </h3>
            <div>
              <p className={styles.productInfoType}>
                Type: {data.data.doc.type}
              </p>
              <p className={styles.productInfoCategory}>
                Category: {data.data.doc.category}
              </p>
            </div>
          </div>
          <div className={styles.productInfoPrice}>
            <p>price per unit {data.data.doc.price}</p>
            <p className={styles.productInfoTotalPrice}>
              Total Price: {product.fullPrice}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.productDetails}>
        <p>
          Total Stock: <span>{data.data.doc.totalAmount}</span>
        </p>
        <p className={styles.productDetailsAfterAccept}>
          Stock after accept:{" "}
          <span>{data.data.doc.totalAmount - product.selectedSizeQty}</span>
        </p>
      </div>
    </div>
  );
}

export default AdminModalOrderProducts;
