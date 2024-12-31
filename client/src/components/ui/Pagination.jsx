/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import styles from "./Pagination.module.scss";

const Pagination = ({ totalItems, currentPage, itemsPerPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const delta = 1; // Number of pages to show on either side of the current page
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    // Add the first page
    pages.push(1);

    // Add ellipsis if needed
    if (left > 2) {
      pages.push("...");
    }

    // Add the range of pages around the current page
    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed
    if (right < totalPages - 1) {
      pages.push("...");
    }

    // Add the last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <div className={styles.text}>
        <p>
          Showing <span>{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
          <span>{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{" "}
          <span>{totalItems}</span> results
        </p>
      </div>
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${currentPage === 1 ? styles.disabled : ""}`}
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        >
          {"<"}
        </button>
        <div className={styles.btnPages}>
          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span key={index} className={styles.ellipsis}>
                ...
              </span>
            ) : (
              <button
                key={index}
                className={`${styles.buttonCircle} ${
                  currentPage === page ? styles.activePage : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>
        <button
          className={`${styles.button} ${
            currentPage === totalPages ? styles.disabled : ""
          }`}
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
