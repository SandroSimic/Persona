import { FaHeart, FaUser } from "react-icons/fa";
import { FaBoxOpen, FaShield } from "react-icons/fa6";
import styles from "./ProfilePage.module.scss";
import { useState } from "react";

function ProfilePage() {
  const navLinks = [
    { to: "profile", text: "General", icon: <FaUser /> },
    { to: "my-orders", text: "My Orders", icon: <FaBoxOpen /> },
    { to: "favorites", text: "Favorites", icon: <FaHeart /> },
    { to: "security", text: "Security", icon: <FaShield /> },
  ];

  const [activeLink, setActiveLink] = useState("profile");

  console.log(activeLink)

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profileSidebar}>
        {navLinks.map((link) => (
          <div
            onClick={() => handleLinkClick(link)}
            key={link.to}
            className={`${styles.profileLink} ${
              activeLink.to === link.to ? styles.active : ""
            }`}
          >
            <p>{link.text}</p>
            <span>{link.icon}</span>
          </div>
        ))}
      </div>
      <div className={styles.profileContent}>Content</div>
    </div>
  );
}

export default ProfilePage;
