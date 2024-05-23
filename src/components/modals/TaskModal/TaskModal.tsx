import React, { FC, useContext, useRef, useState } from "react";
import { Modal } from "react-bootstrap";

import styles from "./TaskModal.module.css";
import { ModalContext } from "../../../contexts/ModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faFile,
  faMessage,
  faMultiply,
  faPen,
  faPhone,
  faTag,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import TextIcon from "@cmp/UI/TextIcon";
import Switch from "@cmp/UI/Switch";

import { ModalType } from "../types";
import TaskModalAside from "./TaskModalAside";
import TaskName from "./TaskName";

interface TaskModalType extends ModalType {}

export const TaskModal: FC<TaskModalType> = (props) => {
  const ctx = useContext(ModalContext);

  return (
    <Modal
      size="lg"
      contentClassName={styles["modal-content"]}
      dialogClassName={styles["dialog"]}
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header className={"flex " + styles.Header}>
        <div className={"flex " + styles.LeftHeader}>
          <FontAwesomeIcon
            icon={faMultiply}
            onClick={props.onHide}
            className={styles.CloseButton}
          />
          <button
            className={
              "button btn-primary-solid " + styles.btn + " " + styles.Contact
            }
          >
            <TextIcon text="تماس" rightIcons={[faPhone]} />
          </button>
        </div>
        <div className={"flex " + styles.RightHeader}>
          <TaskName />
          <div className={styles.Avatar}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.AvatarImg} src="/default.png" alt="AB" />
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.Body}>
        <TaskModalAside />
        <div className={styles.mainContent}>
          <div className={styles.ExpAndStk}>
            <button className={"button btn-secondary-glassy " + styles.btn}>
              <TextIcon text="افزودن برچسب" rightIcons={[faTag]} />
            </button>
            <button className={"button btn-primary-glassy " + styles.btn}>
              <TextIcon text="افزودن توضیحات" rightIcons={[faPen]} />
            </button>
          </div>
          <div className={styles.main_header}>
            <div className={styles.hr} />
            <TextIcon text="فایل ها" rightIcons={[faFile]} IconSize="1.2rem" />
          </div>
          <div className={styles.FilesContent}>
            <div className={styles.FilesPutHere}>فایل را اینجا بیندازید</div>
            <button className={"button btn-primary-glassy " + styles.btn}>
              <TextIcon text="انتخاب فایل" rightIcons={[faUpload]}/>
            </button>
          </div>
          <div className={styles.main_header}>
            <Switch icon={faBullhorn} />
            <div className={styles.hr} />
            <TextIcon text="دیدگاه ها" rightIcons={[faMessage]} />
          </div>
          <div className={styles.CommentsContent}>
            <div className={styles.CommentCreator}>
              <textarea
                className={styles.commentInput}
                placeholder="متن دیدگاه"
                dir="rtl"
              />
              <button className={"button btn-primary-solid " + styles.btn}>
                ارسال
              </button>
            </div>
            <div className={styles.CommentContainer}>
              {/* comments fetch and repr here by its component */}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
