import React, { FC, useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { ModalType } from "./types";

import styles from './BoardCreatorModal.module.css';
import TextInput from "@cmp/UI/TextInput";
import customAxios, { baseURL } from "../../helpers/axios";
import toast from "react-hot-toast";
import { BoardContext } from "../../contexts/BoardContext";
import BoardType from "../../types/BoardType";

interface PropType extends ModalType {}

const BoardCreatorModal : FC<PropType> = (props) => {
    const ctx = useContext(BoardContext);

    const [boardName, setBoardName] = useState<string>('');

    const HandleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBoardName(e.target.value);
    }

    const createBoard = async () => {
        try {
            const url = baseURL + '/board/';
            const data = {
                name: boardName,
                isArcheved: false,
            }
            const res = await customAxios.post(url, data)
            return res.data;

        } catch (error) {
            console.error(error);
            toast.error('خطا در ساخت سازمان، لطفا بعدا امتحان کنید');
        }
    }

    const HandleCreate = async () => {
        try {
            if (boardName.length === 0) throw new Error('لطفا نامی برای سازمان انتخاب کنید');
            console.log('after throw');
            const data = await createBoard() as BoardType;
            ctx.AddBoard(data);
            toast.success('سازمان جدید درست شد');
            return true;

        } catch (error) {
            const err = error as Error;
            toast.error(err.message)
            return false;
        }
    }

    const HandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const Finished = await HandleCreate();
        if (Finished) {
            props.onHide();
        }
    }

    return (
        <Modal
            contentClassName={styles["modal-content"]}
            show={props.show}
            onHide={props.onHide}
        >
            <div className={styles.Header}>
                <div className={styles.HeaderSegment}>
                    مدیریت کاربران
                </div>
                <div className={styles.HeaderSegment + ' ' + styles.HeaderActive}>
                    تنظیمات سازمان
                </div>
            </div>
            <Modal.Body>
                <form onSubmit={HandleSubmit} className={styles.boardForm}>
                    <label htmlFor="titleOfBoard">
                        عنوان سازمان
                    </label>
                    <TextInput className={styles.input} name="titleOfBoard" onChange={HandleNameChange} placeholder="عنوان سازمان را وارد کنید"/>
                    <div className={styles.confirm}>
                        <button type="submit" className="button btn-primary-solid">بساز</button>
                        <button onClick={props.onHide} type="reset" className="button btn-secondary-glassy">لغو</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default BoardCreatorModal;