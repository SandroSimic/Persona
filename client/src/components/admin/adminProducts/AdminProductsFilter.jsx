import { useSearchParams } from "react-router-dom";
import advanceFilters from "./../../../assets/advanceFilters.png";
import styles from "./AdminProductsFilter.module.scss";
import { useEffect, useState } from "react";

const AdminProductsFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [sortOption, setSortOption] = useState(
    searchParams.get("sort") || "all"
  );

  // Handle changes in the search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Update URL when the "Search" button is clicked
  const handleSearchClick = () => {
    if (searchTerm.trim() !== "") {
      searchParams.set("search", searchTerm.trim());
      searchParams.delete("page");
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  // Handle changes in the sort select dropdown
  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOption(value);

    if (value !== "all") {
      searchParams.set("sort", value);
      searchParams.delete("page");
    } else {
      searchParams.delete("sort");
    }
    setSearchParams(searchParams);
  };

  // Cleanup empty search terms or sort options when they are cleared
  useEffect(() => {
    if (searchTerm.trim() === "") {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
    if (sortOption === "all") {
      searchParams.delete("sort");
      setSearchParams(searchParams);
    }
  }, [searchTerm, sortOption, searchParams, setSearchParams]);

  return (
    <div className={styles.adminProductsFilter}>
      <div className={styles.adminProductsFilterSearch}>
        <input
          type="text"
          placeholder="Search Products"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <div className={styles.adminProductsFiltersAdvance}>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="all">Sort By</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="price-low">Price (Low)</option>
          <option value="price-high">Price (High)</option>
          <option value="stock-low">Stock (Low)</option>
          <option value="stock-high">Stock (High)</option>
          <option value="sale">Sale</option>
        </select>
        <button>
          Advance Filters
          <img src={advanceFilters} alt="Advance Filters" />
        </button>
      </div>
    </div>
  );
};

export default AdminProductsFilter;
