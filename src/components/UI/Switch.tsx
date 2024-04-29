import React, {
  FC,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Switch.module.css";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { SwitchCtx } from "../../contexts/SwitchContext";

interface PropType {}

const Switch: FC<PropType> = () => {
  const ctx = useContext(SwitchCtx);

  return (
    <>
      <div className={styles.container} onClick={ctx.onSwitch}>
        <div
          className={
            styles.switchBar +
            " " +
            (ctx.isActive ? styles.enable : styles.disable)
          }
        >
          <div
            className={
              styles.switchLever + " " + (ctx.isActive && styles.enableLever)
            }
          >
            <FontAwesomeIcon icon={faArchive} width={20} height={20} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Switch;
