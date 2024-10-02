import styles from "./LoginPage.module.scss";
import loginImg from "./../assets/login.png";
import LoginForm from "../components/login/LoginForm";

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginPageForm}>
        <LoginForm />
      </div>
      <div className={styles.loginPageImage}>
        <img src={loginImg} alt="Login" />
      </div>
    </div>
  );
};

export default LoginPage;
