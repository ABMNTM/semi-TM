import React, { FC } from "react";
import { faArchive, faHome, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Switch from "@cmp/UI/Switch";

import styles from "./Nav.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Avatar from "@cmp/data-display/Avatar";
import TextInput from "@cmp/UI/TextInput";
import TextIcon from "@cmp/UI/TextIcon";

interface PropType {}

const Nav: FC<PropType> = () => {
  return (
    <nav className={styles.navbar}>
      <TextIcon leftIcons={[faPlus]} text="صفحه اصلی" rightIcons={[faHome]} />
      <div className={styles.leftHeader}>
        <Switch icon={faArchive} />
        <TextInput
          Icon={faMagnifyingGlass}
          onChange={() => {}}
          placeholder="جستجو پروژه ها"
        />
        <div className={styles.avatar}>
          <Avatar color="#fff000" name="AB" status="dot" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
