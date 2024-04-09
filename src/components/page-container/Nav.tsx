import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Switch from "@cmp/UI/Switch";

import styles from "./Nav.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Avatar from "@cmp/data-display/Avatar";

const Nav = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.rightHeader}>
        {/* <button onClick={handle}>
          <FontAwesomeIcon icon={faPlus} />
        </button> */}
        صفحه اصلی
        <FontAwesomeIcon
          icon={faHome}
          width={20}
          height={20}
          className={styles.textIcon}
        />
      </div>
      <div className={styles.leftHeader}>
        <Switch />
        <div>
          <input type="text" name="search" placeholder="جستجوی پروژه ها" />
        </div>
        <div className={styles.avatar}>
          <Avatar status="dot" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
