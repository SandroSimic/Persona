import { useParams } from "react-router-dom";
import { getProductDetail } from "../hooks/product/useGetProduct";
import styles from "./ProductDetailsPage.module.scss";
import ImageGrid from "../components/productDetail/ImageGrid";
import ProductDetail from "../components/productDetail/productDetail";

function ProductDetailsPage() {
  const { productId } = useParams();

  const { data, isFetching, isError } = getProductDetail(productId);

  console.log(data);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  return (
    <div className={styles.productDetailPage}>
      <div className={styles.productDetailContainer}>
        <ImageGrid images={data.images} />
        <ProductDetail data={data} />
      </div>
    </div>
  );
}

export default ProductDetailsPage;
