import React, { FC, useContext } from "react";
import { Modal } from "react-bootstrap";

import styles from "./TaskModal.module.css";
import { ModalContext } from "../../contexts/ModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faCalendarAlt,
  faCalendarMinus,
  faFile,
  faGear,
  faMessage,
  faMultiply,
  faPen,
  faPhone,
  faTasks,
  faTicketAlt,
  faUpload,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import TextIcon from "@cmp/UI/TextIcon";

import { ModalType } from "@cmp/UI/Modal";
import TextInput from "@cmp/UI/TextInput";
import Switch from "@cmp/UI/Switch";

interface TaskModalType extends ModalType {}

export const TaskModal: FC<TaskModalType> = (props) => {
  const ctx = useContext(ModalContext);

  return (
    <Modal
      contentClassName={styles["modal-content"]}
      show={props.show}
      onHide={props.onHide}
      centered
    >
      <Modal.Header className={"flex " + styles.Header}>
        <div className={"flex " + styles.LeftHeader}>
          <div onClick={props.onHide} className={styles.CloseButton}>
            <FontAwesomeIcon icon={faMultiply} />
          </div>
          <button className={"btn btn-primary-glassy " + styles.Contact}>
            <TextIcon text="تماس" rightIcons={[faPhone]} />
          </button>
        </div>
        <div className={"flex " + styles.RightHeader}>
          <div className={styles.TaskProperties}>
            <h6 className={styles.HeaderTaskName}>
              test name{/* task name */}
            </h6>
            <div className={styles.HeaderDetails}>
              test detail{/* task details (owner, create date/) */}
            </div>
            <div className={styles.NameChangeButtons}>
              <button
                className={
                  "btn btn-secondary-glassy " + styles.NameChangeCancell
                }
              >
                لغو
              </button>
              <button
                className={"btn btn-primary-solid " + styles.NameChangeAccept}
              >
                ذخیره
              </button>
            </div>
          </div>
          <div className={styles.Avatar}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/" alt="AB" />
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.OperationList}>
          <div className={styles.Status}>
            <TextIcon
              IconSize="1.2rem"
              text={"status test"}
              rightIcons={[faTasks]}
            />
          </div>
          <div className={styles.TaskList}>
            <TextIcon
              IconSize="1.2rem"
              text={"task list test"}
              rightIcons={[faTasks]}
            />
          </div>
          <div className={styles.hr} />
          <div className={styles.Members}>
            <TextIcon IconSize="1.2rem" text="اعضا" rightIcons={[faUsers]} />
          </div>
          <div className={styles.SetStartTime}>
            <TextIcon
              IconSize="1.2rem"
              text="تعیین زمان شروع"
              rightIcons={[faCalendarAlt]}
            />
          </div>
          <div className={styles.DeadLine}>
            <TextIcon
              IconSize="1.2rem"
              text="تعیین سررسید"
              rightIcons={[faCalendarMinus]}
            />
          </div>
          <div className={styles.setColor}>
            {
              // یکم کار داره بعدا میام سراغش                                                      .
            }
            set color (has work)
          </div>
          <div className={styles.ChooseList}>
            <TextIcon
              IconSize="1.2rem"
              text="افزودن لیست انتخاب"
              rightIcons={[faTasks]}
            />
          </div>
          <div className={styles.Archeve}>
            <TextIcon
              IconSize="1.2rem"
              text="بایگانی"
              rightIcons={[faArchive]}
            />
          </div>
          <div className={styles.MoreSetting}>
            <TextIcon
              IconSize="1.2rem"
              text="تنظیمات بیشتر"
              rightIcons={[faGear]}
            />
          </div>
          <div className={styles.hr} />
          <div className={styles.SetWeight}>
            <TextIcon IconSize="1.2rem" text="تعیین وزن" />
          </div>
          <div className={styles.SetProgress}>
            <TextIcon IconSize="1.2rem" text="تعیین میزان پیشرفت" />
          </div>
          <div className={styles.SetTime}>
            <TextIcon IconSize="1.2rem" text="ثبت زمان" />
          </div>
          <div className={styles.WholeTime}>
            <TextIcon text="کل زمان: ۰:۰۰:۰۰ " />
          </div>
        </div>
        <div>
          {/* main content (choose list, files, commends) */}
          <div className={styles.ExpAndStk}>
            <button>
              <TextIcon text="افزودن برچسب" rightIcons={[faTicketAlt]} />
            </button>
            <button>
              <TextIcon text="افزودن توضیحات" rightIcons={[faPen]} />
            </button>
          </div>
          <div className={styles.FilesHeader}>
            <hr />
            <TextIcon text="فایل ها" rightIcons={[faFile]} />
          </div>
          <div className={styles.FilesContent}>
            <div className={styles.FilesPutHere}>فایل را اینجا بیندازید</div>
            <button>
              <TextIcon text="انتخاب فایل" rightIcons={[faUpload]} />
            </button>
          </div>
          <div className={styles.CommentsHeader}>
            <Switch />
            <hr />
            <TextIcon text="دیدگاه ها" rightIcons={[faMessage]} />
          </div>
          <div className={styles.CommentsContent}>
            <textarea cols={30} rows={10} />
            <button className="btn btn-primary-solid">ارسال</button>
            <div className={styles.CommentContainer}>
              {/* comments fetch and repr here by its component */}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
