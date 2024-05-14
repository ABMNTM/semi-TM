import React, { HTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import styles from "./TextIcon.module.css";

export interface TextIconPropType extends HTMLAttributes<HTMLDivElement> {
  rightIcons?: Array<IconProp>;
  leftIcons?: Array<IconProp>;
  IconSize?: string;
  text: string;
  rightMargins?: string;
  leftMargins?: string;
}

const TextIcon = (props: TextIconPropType) => {
  return (
    <div dir={props.dir} className={styles.container + " " + props.className}>
      {props.leftIcons &&
        props.leftIcons.map((icon) => (
          <FontAwesomeIcon
            style={{ marginRight: props.leftMargins, fontSize: props.IconSize }}
            className={styles.left}
            key={icon.toString()}
            icon={icon}
          />
        ))}

      {props.text}

      <div className={styles.content}>
        {props.rightIcons &&
          props.rightIcons.map((icon) => (
            <FontAwesomeIcon
              style={{
                marginLeft: props.rightMargins,
                fontSize: props.IconSize,
              }}
              className={styles.right}
              key={icon.toString()}
              icon={icon}
            />
          ))}
      </div>
    </div>
  );
};

export default TextIcon;
