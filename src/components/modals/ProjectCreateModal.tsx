import React, { FC, useContext, useEffect, useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import { ModalType } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faMultiply, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import TextInput from "@cmp/UI/TextInput";
import CustomDropDown from "@cmp/UI/CustomDropDown";
import Select from "@cmp/UI/Select";
import DropDownMenu from "@cmp/UI/DropDownMenu";
import { BoardContext } from "../../contexts/BoardContext";

import styles from './ProjectCreateModal.module.css';
import TextIcon from "@cmp/UI/TextIcon";
import customAxios, { baseURL } from "../../helpers/axios";
import toast from "react-hot-toast";
import { ProjectType } from "../../types/BoardType";

interface PropType extends ModalType{
    currentBoard: string;
}

const ProjectCreateModal : FC<PropType> = (props) => {
    
    const [value, setValue] = useState('');
    const [selectedBoard, setSelectedBoard] = useState(props.currentBoard);
    
    const boardCtx = useContext(BoardContext);

    const SelectBoard = () => {
        const toggle = <Select text={selectedBoard} />;
        const options = boardCtx.boards.filter(item => !item.isArcheved).map(item => <Dropdown.Item onClick={() => setSelectedBoard(item.name)}>{item.name}</Dropdown.Item>);
        return (
            <Dropdown>
                <Dropdown.Toggle as='div'>
                    {toggle}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {options}
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    const HandleValueChange : React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    }

    const findBoardID = (name: string) => {
        const finded = boardCtx.boards.find(item => item.name === name);
        return (finded) ? finded.id : "-1";
    }

    const create = async () => {
        try {
            const url = baseURL + '/board/project/';
            const data = {
                name: value,
                board: findBoardID(selectedBoard)
            }
            const res = await customAxios.post(url, data);
            return res.data;
        } catch (e) {
            console.error(e);
            toast.error('خطا در ساخت پروژه جدید \n لطفا بعدا مجدد امتحان کنید');
        }
    }

    const HandleCreate = async () => {
        try {
            if (value.length === 0) throw new Error('لطفا نامی برای پروژه خود انتخاب کنید');
            const created_data = await create();
            const final_data : ProjectType = {...created_data, isStared: false};
            boardCtx.AddProject(findBoardID(selectedBoard), final_data);
        } catch (error) {
            const err = error as Error;
            toast.error(err.message);
        }
    }

    const HandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await HandleCreate();
        props.onHide();
    }

    return (
        <Modal
            onHide={props.onHide}
            show={props.show}
            contentClassName={styles['modal-content']}
            dialogClassName={styles['dialog']}
        >
            <Modal.Header className={styles.Header}>
                <h5>ایجاد پروژه جدید</h5>
                <div onClick={props.onHide} className={styles.closeBtn}>
                    <FontAwesomeIcon icon={faMultiply} />
                </div>
            </Modal.Header>
            <Modal.Body className={styles.Body}>
                <form id="projectForm" onSubmit={HandleSubmit}>
                    <TextInput className={styles.formName} inputClassName={styles.formNameInput} onChange={HandleValueChange} placeholder="عنوان پروژه" />
                    <div className={styles.boardSelection}>
                        <label className={styles.boardLbl}>سازمان</label>
                        <SelectBoard />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className={styles.Footer}>
                <button type="submit" form="projectForm" className={"button btn-primary-solid " + styles.Create}>بساز</button>
                <div>
                    <FontAwesomeIcon icon={faQuestionCircle} className={styles.Help} />
                    <button type="reset" className={"button btn-secondary-glassy " + styles.LoadBtn}>
                        <TextIcon IconSize="x-small" leftMargins="5px" text="بارگذاری" leftIcons={[faChevronDown]} />
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ProjectCreateModal;
