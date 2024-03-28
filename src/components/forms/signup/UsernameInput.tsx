import { useEffect, useReducer } from "react";
import { PropType, StateType, ActionType } from "../types";

import styles from "../signup.module.css";

// actions
const usernameReducerAction = (
  state: StateType,
  action: ActionType
): StateType => {
  switch (action.type) {
    case "USERNAME-INPUT":
      console.log("inp u");
      return {
        ...state,
        value: action.payment,
      };
    case "USERNAME-VALIDATE":
      console.log("val u");
      return {
        ...state,
        isValid: action.payment.length > 4,
      };
    default:
      console.log("trap u");
      return state;
  }
};

export default function UsernameInput(props: PropType) {
  // useReducer
  const [usernameState, dispatchUsername] = useReducer(usernameReducerAction, {
    value: "",
    isValid: false,
  });

  // handlers
  const HandleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchUsername({ type: "USERNAME-INPUT", payment: e.target.value });
  };

  // ...........
  // .useEffect.
  // ***********

  // username validate
  useEffect(() => {
    console.log("out of timer");
    let timer = setTimeout(() => {
      console.log("go to validate username");
      dispatchUsername({
        type: "USERNAME-VALIDATE",
        payment: usernameState.value,
      });
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [usernameState.value]);

  useEffect(() => {
    props.onChange(usernameState.isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameState.isValid]);

  return (
    <>
      <input
        onChange={HandleUsernameChange}
        placeholder="نام کاربری، مانند Azem ..."
        type="text"
        name="username"
      />
      <div className={styles["error-control"]}></div>
    </>
  );
}
