import { AuthPageType } from "../../types/Auth.types";
import bigLogo from "../../images/Persona3.png";
import Input from "../UI/Input";
import styles from "./AuthForm.module.scss";
import Icon from "../UI/Icon";
import { useState } from "react";
import googleImage from "../../images/google.png";
import Line from "../UI/Line";

const AuthForm = ({ formType, setFormType }: AuthPageType) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePasswordVisibility = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsPasswordHidden((prev) => !prev);
  };

  if (formType === "register") {
    return (
      <div className={styles.formSection}>
        <div className={styles.logo}>
          <img src={bigLogo} alt="big logo" />
        </div>

        <form className={styles.loginForm}>
          <Line className={styles.upperLine} />
          <div className={styles.formInfo}>
            <h1>Create Your Account</h1>
            <p>
              Please fill out the essential credentials to create your account!{" "}
            </p>
          </div>
          <div className={styles.formInputs}>
            <Input type="text" icon="user" label="Enter your username" />
            <Input type="email" icon="email" label="Enter your email" />
            <div className={styles.password}>
              <Input
                type={isPasswordHidden ? "password" : "text"}
                className={styles.inputPassword}
                icon="password"
                label="Enter your password"
              />
              <button
                onClick={handlePasswordVisibility}
                className={styles.eyeIconBtn}
              >
                <Icon
                  icon={isPasswordHidden ? "eye" : "closedEye"}
                  className={styles.eyeIcon}
                />
              </button>
            </div>
            <Input
              type={"password"}
              className={styles.inputPassword}
              icon="password"
              label="Confirm Your Password"
            />
            <Input type="file" label="Upload your profile picture" />
          </div>
          <button className={styles.loginBtn}>Register</button>
        </form>

        <p className={styles.switchFormTypeStyle}>
          Already Have An Account?{" "}
          <span onClick={() => setFormType("login")}>Log In</span>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.formSection}>
      <div className={styles.logo}>
        <img src={bigLogo} alt="big logo" />
      </div>
      <Line className={styles.upperLine} />
      <form className={styles.loginForm}>
        <div className={styles.formInfo}>
          <h1>Login To Your Account</h1>
          <p>Please fill out the essential credentials for your account </p>
        </div>
        <div className={styles.formInputs}>
          <Input type="email" icon="email" label="Enter your email" />
          <div className={styles.password}>
            <Input
              type={isPasswordHidden ? "password" : "text"}
              className={styles.inputPassword}
              icon="password"
              label="Enter your password"
            />
            <button
              onClick={handlePasswordVisibility}
              className={styles.eyeIconBtn}
            >
              <Icon
                icon={isPasswordHidden ? "eye" : "closedEye"}
                className={styles.eyeIcon}
              />
            </button>
          </div>
        </div>
        <button className={styles.loginBtn}>Login</button>

        <Line or={true} />

        <div className={styles.googleAppleBtns}>
          <button>
            <img src={googleImage} alt="google icon" />
          </button>
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Icon icon="apple" color={isHovered ? "white" : "#000000"} />
          </button>
        </div>
      </form>

      <p className={styles.switchFormTypeStyle}>
        Don't have an account?{" "}
        <span onClick={() => setFormType("register")}>Register</span>
      </p>
    </div>
  );
};

export default AuthForm;
