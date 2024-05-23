import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faDotCircle,
  faGears,
  faHouse,
  faMessage,
  faPlus,
  faStopwatch,
  faTasks,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import TextIcon from "@cmp/UI/TextIcon";

import styles from "./Aside.module.css";

interface PropType {
  projectName: string;
}

type SelectedFieldType = "works" | "timeLogs" | "chat";

const Aside = (props: PropType) => {
  const [selectedField, setSelectedField] =
    useState<SelectedFieldType>("works");

  const HandleWorkSelection = () => {
    setSelectedField("works");
  };

  const HandleTimeLogSelection = () => {
    setSelectedField("timeLogs");
  };

  const HandleChatSelection = () => {
    setSelectedField("chat");
  };

  return (
    <aside className={styles.container}>
      <div className={styles.home}>
        <Link href={"/a/"}>
          <TextIcon
            style={{justifyContent: "flex-start"}}
            dir="ltr"
            rightMargins="5px"
            rightIcons={[faChevronRight, faHouse]}
            text={props.projectName}
          />
        </Link>
      </div>
      <div className={styles.main}>
        <div className={styles.asideList}>
          <div
            onClick={HandleWorkSelection}
            className={
              styles.ListWorks +
              " " +
              styles.List +
              " " +
              (selectedField === "works" ? styles.selected : styles.selectable)
            }
          >
            <TextIcon dir="ltr" style={{justifyContent: "flex-start"}} rightIcons={[faTasks]} text="کارها" />
          </div>
          <div
            onClick={HandleTimeLogSelection}
            className={
              styles.ListTimeLogs +
              " " +
              styles.List +
              " " +
              (selectedField === "timeLogs"
                ? styles.selected
                : styles.selectable)
            }
          >
            <TextIcon
              dir="ltr"
              rightIcons={[faStopwatch]}
              text="زمان های کاری"
            />
          </div>
          <div className={styles.Chat}>
            <div className={styles.ListChats}>
              <div onClick={HandleChatSelection}>
                <TextIcon dir="ltr" rightIcons={[faMessage]} text="گفتگوها" />
              </div>
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <ul className={styles.ChatList}>
              <li>
                <div
                  onClick={HandleChatSelection}
                  className={
                    styles.List +
                    " " +
                    (selectedField === "chat"
                      ? styles.selected
                      : styles.selectable)
                  }
                >
                  <TextIcon
                    dir="ltr"
                    rightIcons={[faDotCircle]}
                    text="گفتگوی همگانی"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.Footer}>
          <div className={styles.userManagement}>
            <Link href={"#"}>
              <TextIcon
                dir="ltr"
                rightIcons={[faUsers]}
                text="مدیریت کاربران"
              />
            </Link>
          </div>
          <Link href={"#"}>
            <TextIcon
              dir="ltr"
              rightIcons={[faGears]}
              text="تنظیمات"
              leftIcons={[faChevronDown]}
            />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
