import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Switch.module.css";
import { faArchive } from "@fortawesome/free-solid-svg-icons";

const Switch = (props: any) => {
  // not stay at any mode
  return (
    <>
      <div className={styles.container}>
        <div className={styles.switchBar}></div>
        <div className={styles.switchLever}>
          <FontAwesomeIcon icon={faArchive} width={20} height={20} />
        </div>
      </div>
    </>
  );
};

export default Switch;
