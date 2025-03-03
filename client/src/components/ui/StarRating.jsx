/* eslint-disable react/prop-types */
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import styles from "./StarRating.module.scss";

function StarRating({ rating, small }) {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 >= 0.5; // Check for half star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }

    return stars;
  };

  return (
    <div className={`${styles.starRating} ${small ? styles.small : ""}`}>
      {renderStars()}
    </div>
  );
}

export default StarRating;
