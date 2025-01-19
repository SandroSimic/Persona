import { useParams } from "react-router-dom";
import { getProductDetail } from "../hooks/product/useGetProduct";
import styles from "./ProductDetailsPage.module.scss";
import ImageGrid from "../components/productDetail/ImageGrid";
import ProductDetail from "../components/productDetail/productDetail";
import ProductDescription from "../components/productDetail/ProductDescription";
import Spinner from "../components/ui/Spinner";

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
          <ImageGrid images={data.images} />
          <ProductDetail data={data} />
          <ProductDescription description={data.description} />
        </div>
      )}
    </div>
  );
}

export default ProductDetailsPage;
