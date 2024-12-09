import styles from "./AdminProductForm.module.scss";
import AdminProductImageForm from "./AdminProductImageForm";
import AdminProductsInfoForm from "./AdminProductsInfoForm";

const AdminProductForm = () => {

  return (
    <div className={styles.adminProductForm}>
      <div className={styles.adminProductHeader}>
        <h1>Add Product</h1>
        <button>Publish Product</button>
      </div>
      <form className={styles.productsForm}>
        <AdminProductImageForm />
        <AdminProductsInfoForm />
      </form>
    </div>
  );
};

export default AdminProductForm;
