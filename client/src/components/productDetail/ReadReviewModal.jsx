/* eslint-disable react/prop-types */
import { useGetReviewsForProduct } from "../../hooks/reviews/useGetReviewsForProduct";
import Modal from "../ui/Modal";
import StarRating from "../ui/StarRating";
import styles from "./ReadReviewModal.module.scss";

function ReadReviewModal({ onClose, isOpen, productId }) {
  const { data: reviews } = useGetReviewsForProduct(productId);

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className={styles.reviews}>
        <h2>All Reviews</h2>
        <div className={styles.reviewContainer}>
          {reviews &&
            reviews.data.reviews.map((review) => (
              <div key={review._id} className={styles.review}>
                <div className={styles.user}>
                  <img src={review.user.userImage} />
                </div>
                <div className={styles.reviewContent}>
                  <div className={styles.reviewHeader}>
                    <p>{review.user.username}</p>
                    <div className={styles.line} />
                    <span>
                      {new Date(review.createdAt).toLocaleDateString
                        ? new Date(review.createdAt).toLocaleDateString()
                        : new Date(review.createdAt).toDateString()}
                    </span>
                  </div>
                  <div className={styles.reviewRating}>
                    <StarRating rating={review.rating} small />
                  </div>
                  <p className={styles.reviewMessage}>{review.message}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );
}

export default ReadReviewModal;
