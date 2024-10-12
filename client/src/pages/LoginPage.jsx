/* eslint-disable react/prop-types */
import styles from "./LoginPage.module.scss";
import loginImg from "./../assets/login.png";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/register/RegisterForm";

const LoginPage = ({ register }) => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginPageForm}>
        {register ? <RegisterForm /> : <LoginForm />}
      </div>
      <div className={styles.loginPageImage}>
        <img src={loginImg} alt="Login" />
      </div>
    </div>
  );
};

export default LoginPage;
