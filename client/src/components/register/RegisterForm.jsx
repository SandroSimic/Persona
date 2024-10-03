import Input from "../ui/Input";
import styles from "./RegisterForm.module.scss";
import { useState } from "react";
import openedEyeImg from "../../assets/openEye.png";
import closedEyeImg from "../../assets/closedEye.png";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  // Separate state for each password field
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={styles.loginFormSection}>
      <form className={styles.loginForm}>
        <div className={styles.loginFormHeader}>
          <h1>Create Your Account</h1>
          <p>
            Please fill out the essential credentials to create your account!{" "}
          </p>
        </div>
        <div className={styles.loginFormInputs}>
          <Input
            placeholder={"Enter your username"}
            type={"text"}
            required={true}
          />
          <Input
            placeholder={"Enter your email"}
            type={"email"}
            required={true}
          />
          <div className={styles.passwordInput}>
            <img
              onClick={togglePassword}
              src={showPassword ? openedEyeImg : closedEyeImg}
              alt="eye"
            />
            <Input
              placeholder={"Enter your password"}
              type={showPassword ? "text" : "password"}
              required
            />
          </div>
          <div className={styles.passwordInput}>
            <img
              onClick={toggleConfirmPassword}
              src={showConfirmPassword ? openedEyeImg : closedEyeImg}
              alt="eye"
            />
            <Input
              placeholder={"Confirm your password"}
              type={showConfirmPassword ? "text" : "password"}
              required
            />
          </div>
          <Input placeholder={"Enter your password"} type={"file"} required />
        </div>
        <button className={styles.loginBtn} type="submit">
          Register
        </button>
      </form>
      <div className={styles.haveAnAccountText}>
        <p>
          Have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
