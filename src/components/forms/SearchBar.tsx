import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./SearchBar.module.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface PropType {
  placeholder?: string;
}

const SearchBar = (props: PropType) => {
  const [focused, setFocused] = useState(false);

  const HandleFocus = () => {
    setFocused(true);
  };

  const HandleBlur = () => {
    setFocused(false);
  };

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
          name="search"
          id={styles.searchBar}
          placeholder={props.placeholder}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} id={styles.magnify} />
      </div>
    </>
  );
};

export default SearchBar;
