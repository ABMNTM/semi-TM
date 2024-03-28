import { useEffect, useReducer } from "react";
import { PropType, ActionType, PasswordStateType } from "../types";

import styles from "../signup.module.css";

const passwordReducerAction = (
  state: PasswordStateType,
  action: ActionType
): PasswordStateType => {
  switch (action.type) {
    case "PASSWORD-INPUT":
      console.log("inp p");
      return {
        ...state,
        value: action.payment,
      };
    case "PASSWORD-VALIDATE":
      console.log("val p");
      return {
        ...state,
        isValid: action.payment.length >= 10,
      };
    case "CONFIRM-INPUT":
      console.log("inp c");
      return {
        ...state,
        confirm: action.payment,
      };
    case "CONFIRM-VALIDATE":
      console.log("val c");
      console.log("pwd c", action.payment === state.value);
      return {
        ...state,
        confirmIsValid: action.payment === state.value,
      };
    default:
      console.log("trap p");
      return state;
  }
};

export default function PasswordInput(props: PropType) {
  // useReducer

  const [passwordState, dispatchPassword] = useReducer(passwordReducerAction, {
    value: "",
    isValid: false,
    confirm: "",
    confirmIsValid: true,
  });

  // password validate
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchPassword({
        type: "PASSWORD-VALIDATE",
        payment: passwordState.value,
      });
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [passwordState.value]);

  // confirm password validate
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchPassword({
        type: "CONFIRM-VALIDATE",
        payment: passwordState.confirm,
      });
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [passwordState.confirm]);

  useEffect(() => {
    props.onChange(passwordState.isValid && passwordState.confirmIsValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordState.isValid, passwordState.confirmIsValid]);

  const HandlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchPassword({ type: "PASSWORD-INPUT", payment: e.target.value });
  };

  const HandleConfPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchPassword({ type: "CONFIRM-INPUT", payment: e.target.value });
  };

  return (
    <>
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
    </>
  );
}
