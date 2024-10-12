import bigLogo from "../../assets/logoBig.png";
import Input from "../ui/Input";
import Line from "../ui/Line";
import styles from "./LoginForm.module.scss";
import googleImg from "../../assets/google.png";
import { useState } from "react";
import openedEyeImg from "../../assets/openEye.png";
import closedEyeImg from "../../assets/closedEye.png";
import { useLogin } from "./useLogin";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUserQuery } = useLogin();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUserQuery({ email, password });
  };

  return (
    <div className={styles.loginFormSection}>
      <div className={styles.logoWrapper}>
        <img src={bigLogo} alt="Logo" />
      </div>
      <Line horizontal={true} />
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.loginFormHeader}>
          <h1>Login to Your Account</h1>
          <p>Please fill out the essential credentials for your account </p>
        </div>
        <div className={styles.loginFormInputs}>
          <Input
            placeholder={"Enter your email"}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <div className={styles.passwordInput}>
            <img
              src={showPassword ? openedEyeImg : closedEyeImg}
              alt="eye"
              onClick={togglePassword}
            />
            <Input
              placeholder={"Enter your password"}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
        </div>
        <button className={styles.loginBtn} type="submit">
          Login
        </button>
      </form>
      <Line or={true} />
      <div>
      <a href={`http://localhost:8000/api/auth/google`}>
          <button className={styles.googleBtn}>
            <img src={googleImg} alt="google logo" />
          </button>
        </a>
      </div>
      <div className={styles.haveAnAccountText}>
        <p>
          Don&apos;t have an account? <Link to={"/register"}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
