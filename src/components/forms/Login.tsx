import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { accessTokenKey, baseURL, refreshTokenKey } from "../../helpers/axios";
import { URL } from "url";

import styles from "./auth.module.css";

interface propsType {
  onToggle: () => void;
}

const Login = (props: propsType) => {
  // router
  const router = useRouter();
  // states
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  // validations and state updates
  let etime: NodeJS.Timeout;
  const HandleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUsername(input);
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
      const res = await axios.post(baseURL + "/token/obtain/", {
        username: username, // necessary to config simpleJWT by email instead of username
        password: password,
      });

      Cookies.set(accessTokenKey, res.data.access);
      Cookies.set(refreshTokenKey, res.data.refresh);

      router.push("/a");
    } catch (e) {
      const error = e as AxiosError;

      console.log(error);
      if (error.response && error.response.status === 401) {
        toast.error("نام کاربری یا گذرواژه نادرست است");
      } else {
        toast.error("خطایی وجود دارد");
      }
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
