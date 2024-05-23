import React, { useCallback, useContext, useEffect, useRef, useState } from "react";

import styles from "./ListCreator.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import customAxios, { baseURL } from "../../helpers/axios";
import toast from "react-hot-toast";
import { ListType } from "../../types/ListType";
import { ProjectContext } from "../../contexts/Projectcontext";

interface PropType {
  projectID: string;
}

const ListCreator = (props: PropType) => {
  const [focused, setFocused] = useState(false);
  const [placeholder, setPlacehlder] = useState("ایجاد لیست جدید");
  const [listName, setListName] = useState("");

  const ctx = useContext(ProjectContext)

  const HandleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  }

  const HandleFocus = () => {
    setFocused(true);
  };

  const HandleBlur = () => {
    setFocused(false);
  };

  useEffect(() => {
    setPlacehlder(focused ? "عنوان لیست" : "ایجاد لیست جدید");
  }, [focused]);

  const create = async () => {
    try {
      const url = baseURL + '/list/create/';
      const data = {
        name: listName,
        project: props.projectID,
      };
      const res = await customAxios.post(url, data);
      return res.data;
    } catch (e) {
      console.error(e);
      toast.error('خطا در ساخت لیست');
    }
  }

  const HandleListCreate = async () => {
    if (listName.length > 0) {
      const data = await create() as ListType;
      ctx.AddList(data);
      console.log('before sets');
      setFocused(false);
      console.log('focused set.');
      setListName('');
      console.log('list name set.');
    } else {
      toast.error('نام لیست الزامی است')
    }
  }

  const HandleEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") HandleListCreate()
  }

  return (
    <div
      className={
        styles.container + " " + (focused && styles.containerOnFocus)
      }
    >
      <input
        onFocus={HandleFocus}
        onBlur={HandleBlur}
        onChange={HandleNameChange}
        onKeyDown={HandleEnterPressed}
        type="text"
        name="create"
        id={styles.ListCreator}
        placeholder={placeholder}
        value={listName}
        defaultValue={undefined}
      />
      <FontAwesomeIcon onClick={HandleListCreate} icon={faPlus} id={styles.plus} />
    </div>
  );
};

export default ListCreator;
