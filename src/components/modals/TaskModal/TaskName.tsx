import React, { FC, useState } from "react";

import styles from "./TaskModal.module.css";


interface PropType {

}

const TaskName : FC<PropType> = () => {
  const [name, setName] = useState("test task"); // would be set dynamically
	const Properties = "توسط ABMNTM, در تاریج 1383/03/30"; // would be set dynamically
  const [changeName, setChangeName] = useState(name);
  const [nameFocused, setNameFocused] = useState(false);
  
  const CancellChangeHandler = () => {
    setNameFocused(false);
  }

  const AcceptChangeHandler = () => {
		setNameFocused(false);
		setName(changeName)
		alert("عملیات با موفقیت انجام شد")
  }

  const nameContent = nameFocused ? (
    <div className={styles.NameChangeButtons}>
      <button
        className={"button btn-secondary-glassy " + styles.btn + " " + styles.NameChangeCancell}
        onClick={CancellChangeHandler}
      >
        لغو
      </button>
      <button
        className={"button btn-primary-solid " + styles.btn + " " + styles.NameChangeAccept}
        onClick={AcceptChangeHandler}
      >
        ذخیره
      </button>
    </div>
  ) : (
    <div className={styles.HeaderDetails}>
      <i>
        {Properties}
      </i>
    </div>
  );

  return (
    <div className={styles.TaskProperties}>
        <input
            onFocus={() => setNameFocused(true)}
            value={(nameFocused ? changeName : name)}
            onChange={(e) => setChangeName(e.target.value)}
            className={`input-unstyled ${nameFocused && styles.Focused} ${
            styles.HeaderTaskName}`}
        />
        {nameContent}
    </div>
  );
}

export default TaskName;