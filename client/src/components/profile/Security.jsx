/* eslint-disable no-unused-vars */
import { useState } from "react";
import styles from "./Security.module.scss";
import toast from "react-hot-toast";
import { useUpdatePassword } from "../../hooks/profile/useUpdatePassword";

/* eslint-disable react/prop-types */
function Security({ user }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutateAsync } = useUpdatePassword();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    mutateAsync({ newPassword });
  };
  return (
    <div className={styles.security}>
      <h2>Security</h2>
      <form className={styles.inputs} onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}

export default Security;
