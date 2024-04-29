import React, { FC, MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Switch from "@cmp/UI/Switch";

import styles from "./Nav.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Avatar from "@cmp/data-display/Avatar";
import SearchBar from "@cmp/forms/SearchBar";
import TextIcon from "@cmp/UI/TextIcon";

interface PropType {}

const Nav: FC<PropType> = () => {
  return (
    <nav className={styles.navbar}>
      <TextIcon leftIcons={[faPlus]} text="صفحه اصلی" rightIcons={[faHome]} />
      <div className={styles.leftHeader}>
        <Switch />
        <SearchBar placeholder="جستجو پروژه ها" />
        <div className={styles.avatar}>
          <Avatar color="#fff000" name="AB" status="dot" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
