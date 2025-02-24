import { useState } from "react";
import { useForgotPassword } from "../hooks/auth/useForgotPassword";
import styles from "./ForgotPassword.module.scss";
import { useVerifyPasswordCode } from "../hooks/auth/useVerifyPasswordCode";
import { useResetPassword } from "../hooks/auth/useResetPassword";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const { mutateAsync, isPending } = useForgotPassword();
  const { mutateAsync: mutateVerifyCode } = useVerifyPasswordCode();
  const { mutateAsync: mutateUpdatePassword } = useResetPassword();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync(email);
      setStep(2);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      await mutateVerifyCode({ code, email });
      setStep(3);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await mutateUpdatePassword({ email, code, password });
      navigate("/login");
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.forgotPassword}>
        <h1>Forgot Password</h1>

        <div className={styles.steps}>
          {Array.from({ length: 3 }).map((_, index) => {
            const stepNumber = index + 1;
            let backgroundColor = "black";

            if (stepNumber < step) {
              backgroundColor = "green";
            } else if (stepNumber === step) {
              backgroundColor = "orange";
            }

            return (
              <div
                key={index}
                className={styles.step}
                style={{ backgroundColor }}
              >
                {stepNumber}
              </div>
            );
          })}
        </div>

        {step === 1 && (
          <div>
            <p>
              Enter your email address and we&apos;ll send you a code to reset
              your password.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button disabled={isPending}>
                {isPending ? "Sending Email..." : "Send"}
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <p>
              We&apos;ve sent you an email with a code to reset your password.
              Enter the code below.
            </p>
            <form onSubmit={handleVerifyCode}>
              <input
                type="text"
                placeholder="Code"
                required
                onChange={(e) => setCode(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div>
            <p>
              Enter a new password for your account. Make sure it&apos;s at
              least 8 characters long.
            </p>
            <form onSubmit={handleUpdatePassword}>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
