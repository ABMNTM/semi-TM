import React, { useEffect, useState } from "react";
import styles from "./auth.module.css";
import { validateEmail } from "../../helpers/helpers";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { baseURL } from "../../helpers/axios";

interface propsType {
  onToggle: () => void;
}

const SignUp = (props: propsType) => {
  // states

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [formIsValid, setFormIsValid] = useState(false);

  // handle changes
  let utime: NodeJS.Timeout;
  const HandleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(utime);

    const userInput = e.target.value;
    utime = setTimeout(() => {
      setUsernameError(() => {
        if (userInput.length === 0) {
          return "نام کاربری الزامی است";
        } else if (userInput.length < 4) {
          return "نام کاربری باید حداقل 4 کاراکتر باشد";
        } else if (userInput.length > 22) {
          return "نام کاربری باید حداکثر ۲۲ کاراکتر باشد";
        } else {
          return "";
        }
      });
    }, 300);
    setUsername(userInput);
  };

  let etime: NodeJS.Timeout;
  const HandleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(etime);
    const userInput = e.target.value;
    etime = setTimeout(() => {
      setEmailError(() => {
        if (userInput.length === 0) {
          return "ایمیل الزامی است";
        } else if (!validateEmail(userInput)) {
          return "ایمیل غلط است";
        } else {
          return "";
        }
      });
    }, 300);
    setEmail(userInput);
  };

  let ptime: NodeJS.Timeout;
  const HandlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(ptime);
    const userInput = e.target.value;
    ptime = setTimeout(() => {
      setPasswordError(() => {
        if (userInput.length === 0) {
          return "گذرواژه الزامی است";
        } else if (userInput.length < 10) {
          return "گذرواژه باید حداقل ۱۰ کاراکتر باشد";
        } else {
          return "";
        }
      });
    }, 300);
    setPassword(userInput);
  };

  let ctime: NodeJS.Timeout;
  const HandleConfPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(ctime);
    const userInput = e.target.value;
    ctime = setTimeout(() => {
      setConfirmPasswordError(() => {
        if (userInput !== password) {
          return "گذرواژه ها یکسان نیستند";
        } else {
          return "";
        }
      });
    }, 300);
  };

  // form validation
  useEffect(() => {
    setFormIsValid(
      usernameError.length === 0 &&
        emailError.length === 0 &&
        passwordError.length === 0 &&
        confirmPasswordError.length === 0
    );
  }, [usernameError, emailError, passwordError, confirmPasswordError]);

  // submit handle
  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formIsValid) {
      // user create
      const userData = {
        username: username,
        email: email,
        password: password,
      };

      axios
        .post(baseURL + "/account/create/", userData)
        .then(() => {
          toast.success(".عملیات عضویت با موفقیت انجام شد", {
            duration: 4750,
          });
          setTimeout(function () {
            toast("اکنون می توانید وارد شوید", { duration: 4000 });
          }, 750);
        })
        .catch((error: AxiosError) => {
          toast.error(".خطایی رخ داده است");
        });
    }
  };

  return (
    <div>
      <h2 className={styles.title} dir="rtl">
        عضویت
      </h2>
      <form dir="rtl" onSubmit={HandleSubmit} className={styles["form-main"]}>
        <div className={styles["form-control"]}>
          <input
            className={`${
              usernameError.length === 0 || styles["input-invalid"]
            }`}
            onChange={HandleUsernameChange}
            placeholder="نام کاربری، مانند Azem ..."
            type="text"
            name="username"
          />
          <div className={styles["error-control"]}>{usernameError}</div>
        </div>
        <div className={styles["form-control"]}>
          <input
            className={`${emailError.length === 0 || styles["input-invalid"]}`}
            onChange={HandleEmailChange}
            placeholder="ایمیل، مانند Azem@example.com ..."
            type="text"
            name="username"
          />
          <div className={styles["error-control"]}>{emailError}</div>
        </div>
        <div className={styles["form-control"]}>
          <input
            className={`${
              passwordError.length === 0 || styles["input-invalid"]
            }`}
            onChange={HandlePasswordChange}
            placeholder="گذرواژه"
            type="password"
            name="password"
          />
          <div className={styles["error-control"]}>{passwordError}</div>
        </div>
        <div className={styles["form-control"]}>
          <input
            className={`${
              confirmPasswordError.length === 0 || styles["input-invalid"]
            }`}
            onChange={HandleConfPasswordChange}
            placeholder="تأیید گذرواژه"
            type="password"
            name="confirm-password"
          />
          <div className={styles["error-control"]}>{confirmPasswordError}</div>
        </div>
        <div className={styles["form-btn-container"]}>
          <button
            onClick={props.onToggle}
            className={`${styles.btn} ${styles["btn-toggle"]}`}
            type="button"
          >
            ورود
          </button>
          <button
            className={`${styles.btn} ${styles["btn-submit"]}`}
            type="submit"
          >
            عضویت
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
