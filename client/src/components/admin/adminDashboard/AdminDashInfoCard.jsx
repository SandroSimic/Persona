/* eslint-disable react/prop-types */
import styles from "./AdminDashInfoCard.module.scss";

function AdminDashInfoCard({ title, value, icon, color }) {
  return (
    <div className={styles.adminDashInfoCard}>
      <div className={styles.adminDashInfoCard__content}>
        <p>{title}</p>
        <div className={`${styles.adminDashIcon} ${color}`}>{icon}</div>
      </div>
      <span>{value}</span>
    </div>
  );
}

export default AdminDashInfoCard;
