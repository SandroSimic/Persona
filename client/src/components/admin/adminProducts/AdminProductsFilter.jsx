import advanceFilters from "./../../../assets/advanceFilters.png";
import styles from "./AdminProductsFilter.module.scss";

const AdminProductsFilter = () => {
  return (
    <div className={styles.adminProductsFilter}>
      <div className={styles.adminProductsFilterSearch}>
        <input type="text" placeholder="Search Products" />
        <button>Search</button>
      </div>
      <div className={styles.adminProductsFiltersAdvance}>
        <select>
          <option value="all">Sort By</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="price-low">Price(Low)</option>
          <option value="price-high">Price(High)</option>
          <option value="stock-low">Stock(Low)</option>
          <option value="stock-high">Stock(High)</option>
          <option value="sale">Sale</option>
        </select>
        <button>
          Advance Filters
          <img src={advanceFilters} />
        </button>
      </div>
    </div>
  );
};

export default AdminProductsFilter;
