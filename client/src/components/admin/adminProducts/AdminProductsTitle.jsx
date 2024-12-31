import styles from "./AdminProductsTitle.module.scss";
import plus from "../../../assets/plus.svg";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../../context/ProductContext";

const AdminProductsTitle = () => {
  const navigate = useNavigate();
  const { setProductData } = useProduct();

  return (
    <div className={styles.adminProductsTitle}>
      <h1>Products</h1>
      <button
        onClick={() => {
          navigate("/admin/products/new");
          setProductData({
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
        }}
      >
        Add new product
        <img src={plus} />
      </button>
    </div>
  );
};

export default AdminProductsTitle;
