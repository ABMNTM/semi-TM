import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

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
        <FontAwesomeIcon icon={faHome} className={styles.textIcon} />
      </div>
      <div className={styles.leftHeader}>
        <button className={styles.btnToggle}></button>
        <div>
          <input type="text" name="search" placeholder="جستجوی پروژه ها" />
        </div>
        <div className={styles.avatar}>
          <Avatar />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
