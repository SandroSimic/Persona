import { useSearchParams } from "react-router-dom";
import advanceFilters from "./../../../assets/advanceFilters.png";
import styles from "./AdminProductsFilter.module.scss";
import { useEffect, useState } from "react";
import Modal from "../../ui/Modal";

const AdminProductsFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [sortOption, setSortOption] = useState(
    searchParams.get("sort") || "all"
  );
  const [priceFrom, setPriceFrom] = useState(
    searchParams.get("totalPrice[gt]") || ""
  );
  const [priceTo, setPriceTo] = useState(
    searchParams.get("totalPrice[lt]") || ""
  );
  const [priceDiscountFrom, setPriceDiscountFrom] = useState(
    searchParams.get("priceDiscount[gt]") || ""
  );
  const [priceDiscountTo, setPriceDiscountTo] = useState(
    searchParams.get("priceDiscount[lt]") || ""
  );
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [type, setType] = useState(searchParams.get("type") || "");

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

  const handleApplyFilters = () => {
    // Update the price range
    if (priceFrom) searchParams.set("totalPrice[gt]", priceFrom);
    else searchParams.delete("totalPrice[gt]");

    if (priceTo) searchParams.set("totalPrice[lt]", priceTo);
    else searchParams.delete("totalPrice[lt]");

    // update the price discount range
    if (priceDiscountFrom)
      searchParams.set("priceDiscount[gt]", priceDiscountFrom);
    else searchParams.delete("priceDiscount[gt]");

    if (priceDiscountTo) searchParams.set("priceDiscount[lt]", priceDiscountTo);
    else searchParams.delete("priceDiscount[lt]");

    // Update the category
    if (category) searchParams.set("category", category);
    else searchParams.delete("category");

    // Update the type
    if (type) searchParams.set("type", type);
    else searchParams.delete("type");

    // Set the updated search params
    setSearchParams(searchParams);

    // Close the modal after applying the filters
    setModalIsOpen(false);
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
    <>
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
          <button onClick={() => setModalIsOpen(true)}>
            Advance Filters
            <img src={advanceFilters} alt="Advance Filters" />
          </button>
        </div>
      </div>
      {modalIsOpen && (
        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <div className={styles.modalContent}>
            <h2>Advanced Filters</h2>
            <div className={styles.filterSection}>
              <label>Price Range:</label>
              <div className={styles.priceInputs}>
                <input
                  type="number"
                  placeholder="From"
                  className={styles.priceInput}
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="To"
                  className={styles.priceInput}
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.filterSection}>
              <label>Price Discount Range (%):</label>
              <div className={styles.priceInputs}>
                <input
                  type="number"
                  placeholder="From"
                  className={styles.priceInput}
                  value={priceDiscountFrom}
                  onChange={(e) => setPriceDiscountFrom(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="To"
                  className={styles.priceInput}
                  value={priceDiscountTo}
                  onChange={(e) => setPriceDiscountTo(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.filterSection}>
              <label>Category:</label>
              <select
                className={styles.selectInput}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Man">Man</option>
                <option value="Woman">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className={styles.filterSection}>
              <label>Type:</label>
              <select
                className={styles.selectInput}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="Hoodie">Hoodie</option>
                <option value="Pants">Pants</option>
                <option value="accessorie">Accessories</option>
                <option value="Shirt">Shirt</option>
                <option value="Sneakers">Sneakers</option>
                <option value="Jacket">Jacket</option>
              </select>
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setModalIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className={styles.confirmBtn}
                onClick={handleApplyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AdminProductsFilter;
