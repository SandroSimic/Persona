/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { useGetProfileStats } from "../../hooks/profile/useGetProfileStats";
import { useUpdateEmailUsername } from "../../hooks/profile/useUpdateEmailUsername";
// Optionally, if you have a hook for updating profile images, import it here
// import { useUpdateProfileImage } from "../../hooks/profile/useUpdateProfileImage";
import styles from "./General.module.scss";
import { FaBoxOpen, FaHeart, FaShoppingCart } from "react-icons/fa";

function General({ user }) {
  const { data } = useGetProfileStats();
  const { updateEmailUsernameMutation } = useUpdateEmailUsername();
  // const { updateProfileImageMutation } = useUpdateProfileImage();

  const STATS = [
    { title: "Orders", value: data?.data?.ordersCount, icon: <FaBoxOpen /> },
    {
      title: "In Cart",
      value: data?.data?.cartCount,
      icon: <FaShoppingCart />,
    },
    { title: "Favorites", value: data?.data?.favoriteCount, icon: <FaHeart /> },
  ];

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  useEffect(() => {
    setEmail(user?.user?.email || "");
    setUsername(user?.user?.username || "");
  }, [user?.user?.email, user?.user?.username]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleUpdate = () => {
    if (validateEmail(email)) {
      updateEmailUsernameMutation({ email, username, image });
    } else {
      setEmailError("Please enter a valid email before updating.");
    }
  };

  // Opens the hidden file input when the image is clicked
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handles file selection and updates the image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);
      setSelectedImage(imagePreviewUrl);
      setImage(file);
      console.log(file);
      console.log("IAMGE", image);

      // Optionally, call a mutation or function to update the profile image on the server
      // updateProfileImageMutation(file);
    }
  };

  return (
    <div className={styles.general}>
      <h2>My Profile</h2>
      <div className={styles.profile}>
        <div
          className={styles.profileImage}
          onClick={handleImageClick}
          style={{ cursor: "pointer" }}
        >
          <img src={selectedImage || user?.user?.userImage} alt="Profile" />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <div className={styles.profileDetails}>
          <div className={styles.profileDetailsInputs}>
            <div>
              <label>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <input value={email} onChange={handleEmailChange} />
              {emailError && <p className={styles.error}>{emailError}</p>}
            </div>
          </div>
          <button onClick={handleUpdate} disabled={!!emailError}>
            Update
          </button>
        </div>
      </div>
      <div className={styles.stats}>
        {STATS.map((stat) => (
          <div key={stat.title} className={styles.stat}>
            <div className={styles.icon}>{stat.icon}</div>
            <div className={styles.statDetails}>
              <p>{stat.title}</p>
              <span>{stat.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default General;
