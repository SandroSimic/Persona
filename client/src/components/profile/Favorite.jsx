import { useGetFavorites } from "../../hooks/product/useGetFavorites";
import styles from "./Favorite.module.scss";
import { useNavigate } from "react-router-dom";

function Favorite() {
  const { data } = useGetFavorites();
  const navigate = useNavigate();

  return (
    <div className={styles.favoriteContainer}>
      <h2>My Favorites</h2>
      <div className={styles.favoriteList}>
        {data?.data?.favorites.map((favorite) => (
          <div key={favorite.id} className={styles.favoriteItemContainer}>
            <div className={styles.favoriteItem}>
              <div className={styles.favoriteImage}>
                <img src={favorite.images[0]} alt={favorite.name} />
              </div>
              <div className={styles.favoriteDetails}>
                <div>
                  <h3>{favorite.title}</h3>
                  <div className={styles.favoriteSizes}>
                    <p>Available Sizes:</p>
                    <div>
                      {favorite.sizes.map((size) => (
                        <span key={size}>({size.name})</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className={styles.price}>Total Price: ${favorite.price}</p>
              </div>
            </div>
            <button onClick={() => navigate(`/product/${favorite._id}`)}>
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorite;
