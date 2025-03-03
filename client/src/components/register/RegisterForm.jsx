import Input from "../ui/Input";
import styles from "./RegisterForm.module.scss";
import { useState } from "react";
import openedEyeImg from "../../assets/openEye.png";
import closedEyeImg from "../../assets/closedEye.png";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useRegister } from "./useRegister";

const RegisterForm = () => {
  // Separate state for each password field
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { registerUserQuery } = useRegister();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    userImage: "",
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("userImage", userData.userImage);

    if (!formData) {
      return;
    }

    if (userData.password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      registerUserQuery(formData);
    } catch (error) {
      console.log("ERRORconsole.log", error);
    }
  }

  return (
    <div className={styles.loginFormSection}>
      <form className={styles.loginForm} onSubmit={onSubmit}>
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
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
          <Input
            placeholder={"Enter your email"}
            type={"email"}
            required={true}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
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
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
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
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
          </div>
          <Input
            placeholder={"Enter your Profile Image"}
            type={"file"}
            required
            onChange={(e) =>
              setUserData({ ...userData, userImage: e.target.files[0] })
            }
          />
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
