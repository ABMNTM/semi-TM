import React, { FC, HTMLAttributes } from "react";
import ProjectCard from "@cmp/data-display/ProjectCard";
import BoardType, { ProjectType } from "../../types/BoardType";
import {
  faArchive,
  faBarChart,
  faBuilding,
  faChevronDown,
  faGears,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import TextIcon from "@cmp/UI/TextIcon";
import Dropdown from "react-bootstrap/Dropdown";

import styles from "./BoardCard.module.css";
import { EmptyBoard } from "@cmp/page-container/BoardContainer";
import customAxios from "../../helpers/axios";

interface PropType extends HTMLAttributes<HTMLDivElement> {
  data: BoardType;
}

const BoardCard: FC<PropType> = ({ data }) => {
  return (
    <>
      <div>
        <div className={styles.boardHeader}>
          <TextIcon
            className={styles.boardTitle}
            text={data.name}
            rightIcons={[faBuilding]}
          />
          <button
            className={
              styles.PageButton +
              " " +
              styles.createProject +
              " " +
              styles.headerButton
            }
            //onClick={/}
          >
            ایجاد پروژه
          </button>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              className={
                styles.PageButton +
                " " +
                styles.setting +
                " " +
                styles.headerButton
              }
            >
              <TextIcon
                leftIcons={[faChevronDown]}
                leftMargins="5px"
                text="تنظیمات"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdownMenu}>
              <Dropdown.Item>
                <TextIcon text="مدیریت کاربران" rightIcons={[faPeopleGroup]} />
              </Dropdown.Item>
              <Dropdown.Item>
                <TextIcon text="تنظیمات سازمان" rightIcons={[faGears]} />
              </Dropdown.Item>
              <Dropdown.Item>
                <TextIcon text="ارتقا به طرح تجاری" rightIcons={[]} />
              </Dropdown.Item>
              <Dropdown.Item>
                <TextIcon
                  text="بستن سازمان"
                  rightIcons={[faArchive]}
                  className={styles.closeBoard}
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div
            className={
              styles.PageButton +
              " " +
              styles.analyse +
              " " +
              styles.headerButton
            }
          >
            <TextIcon
              text="تحلیل گر"
              rightIcons={[faBarChart]}
              rightMargins="5px"
            />
          </div>
        </div>
        <div className={styles.projectContainer}>
          {data.projects.length > 0 ? (
            data.projects.map((item) => (
              <ProjectCard
                isStared={item.isStared}
                ID={item.id}
                key={item.id}
                title={item.name}
              />
            ))
          ) : (
            <EmptyBoard msg="!هنوز پروژه ای درست نشده است" />
          )}
        </div>
      </div>
    </>
  );
};

export default BoardCard;
