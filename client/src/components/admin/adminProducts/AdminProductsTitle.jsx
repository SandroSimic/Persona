import styles from "./AdminProductsTitle.module.scss";
import plus from "../../../assets/plus.svg";
import { useNavigate } from "react-router-dom";

const AdminProductsTitle = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.adminProductsTitle}>
      <h1>Products</h1>
      <button onClick={() => navigate('/admin/products/new')}>
        Add new product
        <img src={plus} />
      </button>
    </div>
  );
};

export default AdminProductsTitle;
