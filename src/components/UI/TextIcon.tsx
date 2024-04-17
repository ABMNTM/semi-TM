import React, { HTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import styles from "./TextIcon.module.css";

interface PropType extends HTMLAttributes<HTMLDivElement> {
  rightIcons?: Array<IconProp>;
  leftIcons?: Array<IconProp>;
  text: string;
  rightMargins?: string;
  leftMargins?: string;
}

const TextIcon = (props: PropType) => {
  return (
    <>
      <div className={styles.content}>
        {props.rightIcons &&
          props.rightIcons.map((icon) => (
            <FontAwesomeIcon
              style={{ marginRight: props.rightMargins }}
              className={styles.right}
              key={icon.toString()}
              icon={icon}
            />
          ))}

        {props.text}

        {props.leftIcons &&
          props.leftIcons.map((icon) => (
            <FontAwesomeIcon
              style={{ marginRight: props.leftMargins }}
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
