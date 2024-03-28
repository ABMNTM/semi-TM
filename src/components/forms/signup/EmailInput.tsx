import { useEffect, useReducer } from "react";
import { PropType, StateType, ActionType } from "../types";

import styles from "../signup.module.css";

// helper
const validateEmail = (emailInput: string): boolean => {
  const matchArray = emailInput
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  return matchArray ? true : false;
};

// actions

const emailReducerAction = (
  state: StateType,
  action: ActionType
): StateType => {
  switch (action.type) {
    case "EMAIL-INPUT":
      console.log("inp e");
      return {
        ...state,
        value: action.payment,
      };
    case "EMAIL-VALIDATE":
      console.log("val e");
      return {
        ...state,
        isValid: validateEmail(action.payment),
      };
    default:
      console.log("trap e");
      return state;
  }
};

export default function EmailInput(props: PropType) {
  // reducers
  const [emailState, dispatchEmail] = useReducer(emailReducerAction, {
    value: "",
    isValid: false,
  });

  // effects
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchEmail({ type: "EMAIL-VALIDATE", payment: emailState.value });
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [emailState.value]);

  useEffect(() => {
    props.onChange(emailState.isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailState.isValid]);

  // change handler
  const HandleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchEmail({ type: "EMAIL-INPUT", payment: e.target.value });
  };

  return (
    <>
      <input
        onChange={HandleEmailChange}
        placeholder="ایمیل، مانند Azem@example.com ..."
        type="text"
        name="username"
      />
      <div className={styles["error-control"]}></div>
    </>
  );
}
