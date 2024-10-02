import bigLogo from "../../assets/logoBig.png";
import Input from "../ui/Input";
import Line from "../ui/Line";
import styles from "./LoginForm.module.scss";
import googleImg from "../../assets/google.png";
import { useState } from "react";
import openedEyeImg from "../../assets/openEye.png";
import closedEyeImg from "../../assets/closedEye.png";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.loginFormSection}>
      <div className={styles.logoWrapper}>
        <img src={bigLogo} alt="Logo" />
      </div>
      <Line horizontal={true} />
      <form className={styles.loginForm}>
        <div className={styles.loginFormHeader}>
          <h1>Login to Your Account</h1>
          <p>Please fill out the essential credentials for your account </p>
        </div>
        <div className={styles.loginFormInputs}>
          <Input placeholder={"Enter your email"} />
          <div className={styles.passwordInput}>
            <img
              src={showPassword ? openedEyeImg : closedEyeImg}
              alt="eye"
              onClick={togglePassword}
            />
            <Input
              placeholder={"Enter your password"}
              type={showPassword ? "text" : "password"}
            />
          </div>
        </div>
        <button className={styles.loginBtn}>Login</button>
      </form>
      <Line or={true} />
      <div>
        <button className={styles.googleBtn}>
          <img src={googleImg} alt="google logo" />
        </button>
      </div>
      <div className={styles.haveAnAccountText}>
        <p>
          Don&apos;t have an account? <span>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
