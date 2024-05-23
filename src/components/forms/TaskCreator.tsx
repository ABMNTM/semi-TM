import React, { useContext, useState } from "react";
import { ProjectContext } from "../../contexts/Projectcontext";
import customAxios, { baseURL } from "../../helpers/axios";
import toast from "react-hot-toast";
import { StatusType } from "../../types/ListType";

import styles from "./TaskCreator.module.css";

interface PropType {
    status: StatusType;
    parentListId: string;
    onHide(): void;
}

const TaskCreator = (props: PropType) => {
    const ctx = useContext(ProjectContext);
    const [value, setValue] = useState('');

    const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }

    const HandleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") acceptHandler()
    }

    const Create = async () => {
        const url = baseURL + '/list/task/';
        const data = {
            context: value,
            status: props.status,
            related_list: props.parentListId,
        }
        const res = await customAxios.post(url, data);
        return res.data
    };

    const cancellHandler = () => {
        props.onHide()
    }

    const acceptHandler = async () => {
        if (value.length > 0) {
            const newTask = await Create()
            ctx.AddTask(props.parentListId, newTask);
            props.onHide()
        } else {
            toast.error('لطفا متنی برای کار خود معین کنید')
        }
    }

    return (
        <div className={styles.container}>
            <textarea autoFocus value={value} onKeyDown={HandleEnter} onChange={changeHandler} dir="rtl" className={styles.Input} placeholder="عنوان کار" />
            <div className={styles.ConfirmContainer}>
                <button onClick={cancellHandler} className={"button " + styles.CancellBtn}>لغو</button>
                <button onClick={acceptHandler} className={"button btn-primary-solid " + styles.AcceptBtn}>ذخیره</button>
            </div>
        </div>
    )
}

export default TaskCreator;