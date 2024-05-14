import React, { ChangeEvent, useState } from "react";
import { Modal } from "react-bootstrap";

import styles from "./DeleteBoardModal.module.css";
import TextInput from "@cmp/UI/TextInput";
import { ModalType } from "@cmp/UI/Modal";

interface BoardDeletePropType extends ModalType {
  boardName: string;
}

export const BoardDeleteModal = (props: BoardDeletePropType) => {
  const [accept, setAccept] = useState(false);
  const [acceptName, setAcceptName] = useState("");

  const ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAcceptName(e.target.value);
    setAccept(e.target.value === props.boardName);
  };

  return (
    <Modal
      className={styles.DMContainer}
      dir="rtl"
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header dir="ltr" closeButton>
        <h3>حذف سازمان</h3>
      </Modal.Header>
      <Modal.Body style={{ color: "red" }}>
        این عمل <b>برگشت‌ناپذیر</b> است. همه اطلاعات سازمان و پروژه‌های آن، شامل
        کارها، زمان‌های ثبت‌شده، فایل‌ها، اطلاعات تحلیل‌گر، فعالیت‌ها و غیره حذف
        خواهند شد <br />
        لطفاً عنوان سازمان را برای تایید وارد کنید
      </Modal.Body>
      <Modal.Footer>
        <button className={styles.deleteBtn} disabled={!accept}>
          حذف
        </button>
        <TextInput onChange={ChangeHandler} placeholder="عنوان سازمان" />
      </Modal.Footer>
    </Modal>
  );
};
