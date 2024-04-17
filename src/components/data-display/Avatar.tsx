import React from "react";
import Image from "next/image";

import styles from "./Avatar.module.css";

interface propType {
  // hasProfilePic: boolean;
  // src?: string;
  color: string; // required at next phases
  name: string;
  status?: string;
}

const Avatar = (props: propType) => {
  const border = (
    <div
      style={{ backgroundColor: props.color }}
      className={`${styles.avatar} ${styles.border}`}
    >
      {props.name}
    </div>
  );
  const dot = (
    <div style={{ backgroundColor: props.color }} className={styles.avatar}>
      <div className={styles.dot}></div>
      {props.name}
    </div>
  );

  const contentWithStatus =
    props.status === "dot" ? dot : props.status === "border" ? border : null;
  return <>{contentWithStatus}</>;
};

export default Avatar;
