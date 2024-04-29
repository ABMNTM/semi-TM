import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./ListCreator.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ListCreator = () => {
  const [focused, setFocused] = useState(false);
  const [placeholder, setPlacehlder] = useState("ایجاد لیست جدید");

  const HandleFocus = () => {
    setFocused(true);
  };

  const HandleBlur = () => {
    setFocused(false);
  };

  useEffect(() => {
    setPlacehlder(focused ? "عنوان لیست" : "ایجاد لیست جدید");
  }, [focused]);

  return (
    <>
      <div
        className={
          styles.container + " " + (focused && styles.containerOnFocus)
        }
      >
        <input
          onFocus={HandleFocus}
          onBlur={HandleBlur}
          type="text"
          name="create"
          id={styles.ListCreator}
          placeholder={placeholder}
        />
        <FontAwesomeIcon icon={faPlus} id={styles.plus} />
      </div>
    </>
  );
};

export default ListCreator;
