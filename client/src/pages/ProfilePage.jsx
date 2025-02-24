import { FaHeart, FaUser } from "react-icons/fa";
import { FaBoxOpen, FaShield } from "react-icons/fa6";
import styles from "./ProfilePage.module.scss";
import { useState } from "react";
import General from "../components/profile/General";
import { useLoggedInUser } from "../components/login/useGetLoggedInUser";
import Security from "../components/profile/Security";
import MyOrders from "../components/profile/MyOrders";
import Favorite from "../components/profile/Favorite";

function ProfilePage() {
  const navLinks = [
    { to: "profile", text: "General", icon: <FaUser /> },
    { to: "my-orders", text: "My Orders", icon: <FaBoxOpen /> },
    { to: "favorites", text: "Favorites", icon: <FaHeart /> },
    { to: "security", text: "Security", icon: <FaShield /> },
  ];

  const [activeLink, setActiveLink] = useState(navLinks[0]);
  const { data } = useLoggedInUser();

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
      <div className={styles.profileContent}>
        {activeLink.to === "profile" && <General user={data} />}
        {activeLink.to === "security" && <Security user={data} />}
        {activeLink.to === "my-orders" && <MyOrders />}
        {activeLink.to === "favorites" && <Favorite />}
      </div>
    </div>
  );
}

export default ProfilePage;
