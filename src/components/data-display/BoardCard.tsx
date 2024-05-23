import React, { FC, HTMLAttributes, ReactNode, useContext, useState } from "react";
import ProjectCard from "@cmp/data-display/ProjectCard";
import BoardType, { BaseBoardType } from "../../types/BoardType";
import {
  faArchive,
  faBarChart,
  faBuilding,
  faChevronDown,
  faGears,
  faPeopleGroup,
  faRecycle,
  faStarOfLife,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import TextIcon from "@cmp/UI/TextIcon";
import Dropdown from "react-bootstrap/Dropdown";
import { EmptyBoard } from "@cmp/page-container/BoardContainer";
import CustomAxios, { baseURL } from "../../helpers/axios";
import toast from "react-hot-toast";
import { BoardDeleteModal } from "@cmp/modals/DeleteBoardModal";
import { BoardContext } from "../../contexts/BoardContext";
import ProjectCreateModal from "@cmp/modals/ProjectCreateModal";

import styles from "./BoardCard.module.css";

interface PropType extends HTMLAttributes<HTMLDivElement> {
  data: BoardType;
}

const BoardCard: FC<PropType> = ({ data }) => {

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [projectCreateShow, setProjectCreateShow] = useState(false);

  const BoardCtx = useContext(BoardContext);

  const UpdateName = async (BaseUrl: string, name: string) => {
    const url = BaseUrl + data.id;
    try {
      const res = await CustomAxios.patch(url, { name: name });
      BoardCtx.UpdateBoard(res.data);
    } catch (error) {
      console.error(error);
      toast.error("خطا در بروزرسانی نام سازمان");
    }
  };

  const ArcheveAndActiveHandler = async (ArcheveData: {isArcheved: boolean}) => {
      const url = baseURL + "/board/" + data.id + '/';
      const res = await CustomAxios.patch(url, ArcheveData);
      return res.data;
  }

  const Setting : FC<{variant: "Archeve" | "Active"}> = (props) => {
    let menu;
    if (props.variant === "Archeve") {

      const DeleteBoardClickHandler = () => {
        setDeleteModalShow(true);
      }

      const reOpeningBoard = async () => {
        if (confirm("آیا از بازگشایی این سازمان و همه پروژه‌های آن مطمئن هستید؟ اعضا دوباره به پروژه‌های سازمان دسترسی خواهند داشت.")) {
          try {
            const updatedData = await ArcheveAndActiveHandler({isArcheved: false}) as BaseBoardType;
            console.log('yes');
            const finalData = {...updatedData, projects: data.projects} as BoardType;
            BoardCtx.UpdateBoard(finalData);
            toast.success("سازمان بازگشایی شد");
          } catch (error) {
            console.error(error);
            toast.error('خطا در عملیات بروزرسانی سازمان\n\nلطفا بعدا مجدد امتحان کنید');
          }
        }
      }

      menu = (
      <>
        <Dropdown.Item href="#" onClick={reOpeningBoard}>
          <TextIcon className={styles.ReOpening} text="بازگشایی سازمان" rightIcons={[faRecycle]} />
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#" onClick={DeleteBoardClickHandler} >
          <TextIcon text="حذف سازمان" rightIcons={[faTrashCan]} className={styles.closeBoard} />
        </Dropdown.Item>
      </>
      );


    } else if (props.variant === "Active") {


      const ArcheveBoardHandler = async () => {
        if (confirm("آیا از بستن این سازمان و همه پروژه‌های داخل آن اطمینان دارید؟")) {
          const updatedBoard = await ArcheveAndActiveHandler({isArcheved: true}) as BaseBoardType;
          const finalData = {...updatedBoard, projects: data.projects} as BoardType;
          BoardCtx.UpdateBoard(finalData);
        }
      }


      menu = (
        <>
          <Dropdown.Item href="#"><TextIcon text="مدیریت کاربران" rightIcons={[faPeopleGroup]} /></Dropdown.Item>
          <Dropdown.Item href="#"><TextIcon text="تنظیمات سازمان" rightIcons={[faGears]} /></Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#"><TextIcon className={styles.upgrade} text="ارتقا به طرح تجاری" rightIcons={[faStarOfLife]} /></Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#" onClick={ArcheveBoardHandler} >
            <TextIcon text="بستن سازمان" rightIcons={[faArchive]} className={styles.closeBoard} />
          </Dropdown.Item>
        </>
      )


    }

    return (
      <Dropdown>
        <Dropdown.Toggle as="div" className={styles.PageButton + " " + styles.setting + " " + styles.headerButton}>
          <TextIcon leftIcons={[faChevronDown]} leftMargins="5px" text="تنظیمات" />
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.dropdownMenu}>
          {menu}
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  const Delete = async () => {
    const url = "/board/" + data.id + "/";
    try {
      const res = await CustomAxios.delete(url);
      BoardCtx.DeleteBoard(data.id);
    } catch (error) {
      console.error(error);
      toast.error("خطا در حذف سازمان");
    }
  };

  // delete modal show handle

  const showDeleteModal = () => setDeleteModalShow(true);
  const closeDeleteModal = () => setDeleteModalShow(false);

  const showProjectCreate = () => setProjectCreateShow(true);
  const closeProjectCreate = () => setProjectCreateShow(false);

  return (
    <>
      <div>
        <div className={styles.boardHeader}>
          <TextIcon
            className={styles.boardTitle}
            text={data.name}
            rightIcons={[faBuilding]}
          />
          <button className={ styles.PageButton + " " + styles.createProject + " " + styles.headerButton } onClick={showProjectCreate}>
            ایجاد پروژه
          </button>
          <Setting variant={data.isArcheved ? "Archeve" : "Active"} />
          <div className={ styles.PageButton + " " + styles.analyse + " " + styles.headerButton }  >
            <TextIcon text="تحلیل گر" rightIcons={[faBarChart]} rightMargins="5px" />
          </div>
        </div>
        <div className={styles.projectContainer}>
          {data.projects.length > 0 ? (
            data.projects.map((item) => (
              <ProjectCard isStared={item.isStared} ID={item.id} key={item.id} title={item.name} />
            ))
          ) : (
            <EmptyBoard msg="!هنوز پروژه ای درست نشده است" />
          )}
        </div>
      </div>
      {/* modals */}
      <BoardDeleteModal show={deleteModalShow} onHide={() => setDeleteModalShow(false)} boardName={data.name}  />
      <ProjectCreateModal show={projectCreateShow} onHide={closeProjectCreate} currentBoard={data.name} />
    </>
  );
};

export default BoardCard;
