/* eslint-disable react/prop-types */
import styles from "./Drawer.module.scss";

const Drawer = ({
  isOpen,
  onClose,
  classNames = {
    overlay: "",
    modalBase: "",
    modalBody: "",
  },
  position = "left",
  children,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className={`${styles.overlay} ${classNames.overlay}`}
          onClick={onClose}
        />
      )}
      <div
        className={`${styles.drawer} ${
          position === "left" ? styles.left : styles.right
        } ${isOpen ? styles.open : styles.closed} ${classNames.modalBase}`}
      >
        <div className={`${styles.modalBody} ${classNames.modalBody}`}>
          <button
            aria-label="Close Drawer"
            className={styles.closeButton}
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
