import React from "react";
import Image from "next/image";

import styles from "./Avatar.module.css";

interface propType {
  status: string;
}

const Avatar = (props: propType) => {
  const border = <div className={`${styles.avatar} ${styles.border}`}>AB</div>;

  const dot = (
    <div className={styles.avatar}>
      <div className={styles.dot}></div>AB
    </div>
  );

  const contentWithStatus =
    props.status === "dot" ? dot : props.status === "border" ? border : null;
  return <>{contentWithStatus}</>;
};

export default Avatar;
