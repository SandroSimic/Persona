import { useParams } from "react-router-dom";
import { getProductDetail } from "../hooks/product/useGetProduct";
import styles from "./ProductDetailsPage.module.scss";
import ImageGrid from "../components/productDetail/ImageGrid";
import ProductDescription from "../components/productDetail/ProductDescription";
import Spinner from "../components/ui/Spinner";
import ProductDetail from "../components/productDetail/ProductDetail";

function ProductDetailsPage() {
  const { productId } = useParams();

  const { data, isLoading } = getProductDetail(productId);

  return (
    <div className={styles.productDetailPage}>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.productDetailContainer}>
          <ImageGrid images={data?.data?.doc.images} />
          <ProductDetail data={data?.data?.doc} />
          <ProductDescription description={data?.data?.doc.description} />
        </div>
      )}
    </div>
  );
}

export default ProductDetailsPage;
