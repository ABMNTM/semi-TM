import React, { useState } from "react";
import axios, { Axios } from "axios";

import styles from "./auth.module.css";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

interface propsType {
  onToggle: () => void;
}

const Login = (props: propsType) => {
  // router
  const router = useRouter();
  // states
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  let etime: NodeJS.Timeout;
  const HandleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setEmail(input);
  };

  let ptime: NodeJS.Timeout;
  const HandlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPassword(input);
  };

  // handle submit
  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/token/obtain/", {
        username: email, // necessary to config simpleJWT by email instead of username
        password: password,
      });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      router.push("a/");
    } catch (e) {
      // error handling ....
      console.log(e);
      toast.error("some dummy error", {
        duration: 4000,
      });
    }
  };

  return (
    <div>
      <h2 className={styles.title} dir="rtl">
        ورود
      </h2>
      <form
        onSubmit={HandleSubmit}
        dir="rtl"
        className={styles["form-main"] + " " + styles.login}
      >
        <div className={styles["form-control"]}>
          <input
            onChange={HandleEmail}
            type="text"
            name="email"
            placeholder="نام کاربری، مانند Azem..."
          />
        </div>
        <div className={styles["form-control"]}>
          <input
            onChange={HandlePassword}
            type="password"
            name="password"
            placeholder="گذرواژه"
          />
        </div>
        <div className={styles["form-control"]}>
          <label className={styles.stay} htmlFor="stay">
            <input type="checkbox" name="stay" />
            من را برای ۳۰ روز به یاد داشته باش
          </label>
        </div>
        <div className={styles["form-btn-container"]}>
          <button
            onClick={props.onToggle}
            className={`${styles.btn} ${styles["btn-toggle"]}`}
            type="button"
          >
            عضویت
          </button>
          <button
            className={`${styles.btn} ${styles["btn-submit"]}`}
            type="submit"
          >
            ورود
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
