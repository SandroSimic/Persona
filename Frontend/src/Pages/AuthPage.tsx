import styles from "./AuthPage.module.scss";
import AuthForm from "../components/Auth/AuthForm";
import { useState } from "react";
import loginBackground from "../images/loginBackground.jpg";

const AuthPage = () => {
  const [formType, setFormType] = useState<string>("register");

  return (
    <div className={styles.authPage}>
      <div className={styles.actions}>
        <AuthForm formType={formType} setFormType={setFormType} />
      </div>
      <div className={styles.imageWrapper}>
        <img
          className={styles.bgImage}
          src={loginBackground}
          alt="Background"
        />
      </div>
    </div>
  );
};

export default AuthPage;
