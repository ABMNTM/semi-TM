import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import styles from "./TextIcon.module.css";

interface PropType {
  rightIcons?: Array<IconProp>;
  leftIcons?: Array<IconProp>;
  text: string;
}

const TextIcon = (props: PropType) => {
  return (
    <>
      <div className={styles.content}>
        {props.rightIcons &&
          props.rightIcons.map((icon) => (
            <FontAwesomeIcon
              className={styles.right}
              key={icon.toString()}
              icon={icon}
            />
          ))}

        {props.text}

        {props.leftIcons &&
          props.leftIcons.map((icon) => (
            <FontAwesomeIcon
              className={styles.left}
              key={icon.toString()}
              icon={icon}
            />
          ))}
      </div>
    </>
  );
};

export default TextIcon;
