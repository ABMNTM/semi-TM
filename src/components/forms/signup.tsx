import React, { useEffect, useReducer, useState } from "react";
import { PropType, StateType, ActionType, PasswordStateType } from "./types";
import styles from "./signup.module.css";
import UsernameInput from "./signup/UsernameInput";
import EmailInput from "./signup/EmailInput";
import PasswordInput from "./signup/PasswordInput";

const SignUp = () => {
  // states
  const [formIsValid, setFormIsValid] = useState(false);
  const [usernameValidate, setUsernameValidate] = useState(false);
  const [emailValidate, setEmailValidate] = useState(false);
  const [passwordValidate, setPasswordValidate] = useState(false);

  // form validate
  useEffect(() => {
    setFormIsValid(usernameValidate && emailValidate && passwordValidate);
  }, [usernameValidate, emailValidate, passwordValidate]);

  // change handle
  const HandleUsernameChange = (val: boolean) => {
    setUsernameValidate(val);
  };

  const HandleEmailChange = (val: boolean) => {
    setEmailValidate(val);
  };

  const HandlePasswordChange = (val: boolean) => {
    setPasswordValidate(val);
  };

  // submit handle
  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <form dir="rtl" onSubmit={HandleSubmit} className={styles["form-main"]}>
        <div className={styles["form-control"]}>
          <UsernameInput onChange={HandleUsernameChange} />
        </div>
        <div className={styles["form-control"]}>
          <EmailInput onChange={HandleEmailChange} />
        </div>
        <PasswordInput onChange={HandlePasswordChange} />
        <button className={styles["btn-submit"]} type="submit">
          ورود
        </button>
      </form>
    </>
  );
};

export default SignUp;
