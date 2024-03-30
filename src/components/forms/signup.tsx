import React, { useState } from "react";
import styles from "./signup.module.css";
import axios from "axios";

const SignUp = () => {
  // states

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  // handle changes

  const HandleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const HandleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const HandlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const HandleConfPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  // submit handle
  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("account/create/", {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((response) => {})
      .catch();
  };

  return (
    <>
      <form dir="rtl" onSubmit={HandleSubmit} className={styles["form-main"]}>
        <div className={styles["form-control"]}>
          <input
            onChange={HandleUsernameChange}
            placeholder="نام کاربری، مانند Azem ..."
            type="text"
            name="username"
          />
          <div className={styles["error-control"]}>{}</div>
        </div>
        <div className={styles["form-control"]}>
          <input
            onChange={HandleEmailChange}
            placeholder="ایمیل، مانند Azem@example.com ..."
            type="text"
            name="username"
          />
          <div className={styles["error-control"]}></div>
        </div>
        <div className={styles["form-control"]}>
          <input
            onChange={HandlePasswordChange}
            placeholder="گذرواژه"
            type="password"
            name="password"
          />
          <div className={styles["error-control"]}></div>
        </div>
        <div className={styles["form-control"]}>
          <input
            onChange={HandleConfPasswordChange}
            placeholder="تأیید گذرواژه"
            type="password"
            name="confirm-password"
          />
          <div className={styles["error-control"]}></div>
        </div>
        <button className={styles["btn-submit"]} type="submit">
          ورود
        </button>
      </form>
    </>
  );
};

export default SignUp;
