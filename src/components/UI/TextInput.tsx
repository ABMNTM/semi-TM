import React, { ChangeEvent, HTMLAttributes, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import styles from "./TextInput.module.css";

interface PropType extends HTMLAttributes<HTMLDivElement> {
  inputClassName?: string;
  iconClassName?: string;
  placeholder?: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  Icon?: IconProp;
  name?: string;
}

const TextInput = (props: PropType) => {
  const [focused, setFocused] = useState(false);

  const HandleFocus = () => {
    setFocused(true);
  };

  const HandleBlur = () => {
    setFocused(false);
  };

  return (
      <div
        className={
          props.className + ' '+ styles.container + " " + (focused ? styles.containerOnFocus : '')
        }
      >
        <input
          onFocus={HandleFocus}
          onBlur={HandleBlur}
          type="text"
          name={props.name}
          onChange={props.onChange}
          className={`${props.inputClassName} ${(props.Icon) ? styles.empty : styles.full} ${styles.TextInput}`}
          placeholder={props.placeholder}
        />
        {props.Icon && (
          <FontAwesomeIcon icon={props.Icon} className={props.iconClassName + ' ' + styles.magnify} />
        )}
      </div>
  );
};

export default TextInput;
