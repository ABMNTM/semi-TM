import React, { ChangeEvent, HTMLAttributes, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import styles from "./TextInput.module.css";

interface PropType extends HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  Icon?: IconProp;
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
          styles.container + " " + (focused && styles.containerOnFocus)
        }
      >
        <input
          onFocus={HandleFocus}
          onBlur={HandleBlur}
          type="text"
          name="search"
          onChange={props.onChange}
          id={styles.TextInput}
          placeholder={props.placeholder}
        />
        {props.Icon && (
          <FontAwesomeIcon icon={props.Icon} id={styles.magnify} />
        )}
      </div>
  );
};

export default TextInput;
