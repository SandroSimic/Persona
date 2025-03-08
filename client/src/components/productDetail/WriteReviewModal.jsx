/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../ui/Modal";
import { FaRegStar, FaStar } from "react-icons/fa";
import styles from "./WriteReviweModal.module.scss";
import { useAddReview } from "../../hooks/reviews/useAddReview";

function WriteReviewModal({ onClose, isOpen, productId }) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const mutation = useAddReview();

  const handleSubmit = () => {
    mutation.mutate({
      productId,
      rating,
      message,
    });
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <h1 className={styles.addReview}>Add Review</h1>
      <div className={styles.starRating}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={styles.star}
            onClick={() => setRating(star)}
          >
            <div>
              {star <= rating ? <FaStar color="black" /> : <FaRegStar />}
            </div>
          </span>
        ))}
      </div>
      <div className={styles.reviewForm}>
        <textarea
          placeholder="Write your review..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
          Submit Review
        </button>
      </div>
    </Modal>
  );
}

export default WriteReviewModal;
