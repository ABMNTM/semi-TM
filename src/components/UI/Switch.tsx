import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Switch.module.css";
import { faArchive } from "@fortawesome/free-solid-svg-icons";

const Switch = (props: any) => {
  const [switchMode, setSwitchMode] = useState(false); //false means right

  const HandleSwitch = () => {
    setSwitchMode((lastMode) => !lastMode);
  };

  return (
    <>
      <div className={styles.container} onClick={HandleSwitch}>
        <div
          className={
            styles.switchBar +
            " " +
            (switchMode ? styles.enable : styles.disable)
          }
        >
          <div
            className={
              styles.switchLever + " " + (switchMode && styles.enableLever)
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
