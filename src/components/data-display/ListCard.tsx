import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./ListCard.module.css";
import { faGrip } from "@fortawesome/free-solid-svg-icons";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons/faGripVertical";

export interface taskType {
  id: number;
  title: string;
  status: "TD" | "DN" | "DI";
  // TD : todo | DI : doing | DN : done
}

interface TaskTempType {
  title: string;
  key?: number;
}

interface propType {
  title: string;
  width: number;
  height: number;
  tasks: Array<taskType>;
}

const ListCard = (props: propType) => {
  const todos = props.tasks.filter((task) => task.status === "TD");
  const doings = props.tasks.filter((task) => task.status === "DI");
  const dones = props.tasks.filter((task) => task.status === "DN");

  const TaskTemp = (props: TaskTempType) => {
    return <div className={styles.task}>{props.title}</div>;
  };

  return (
    <>
      <div
        style={{ width: props.width, height: props.height }}
        className={styles.container}
      >
        <div className={styles.header}>
          <div className={styles.dragdropIcon}>
            <FontAwesomeIcon icon={faGripVertical} />
          </div>
          <h4 className={styles.title}>{props.title}</h4>
          <div className={styles.settingIcon}>S</div>
        </div>
        <div className={styles.tasks}>
          <div className={styles.taskHeader}>
            <div>({todos.length}) Todo</div>
          </div>
          {todos.map((todo) => (
            <TaskTemp key={todo.id} title={todo.title} />
          ))}
          <div className={`${styles.statusBar} ${styles.red}`} />
        </div>
        <div className={styles.tasks}>
          <div className={styles.taskHeader}>
            <div>({doings.length}) Doing</div>
            <div>p</div>
          </div>
          {doings.map((todo) => (
            <TaskTemp key={todo.id} title={todo.title} />
          ))}
          <div className={`${styles.statusBar} ${styles.yellow}`} />
        </div>
        <div className={styles.tasks}>
          <div className={styles.taskHeader}>
            <div>({dones.length}) Done</div>
            <div>p</div>
          </div>
          {dones.map((todo) => (
            <TaskTemp key={todo.id} title={todo.title} />
          ))}
          <div className={`${styles.statusBar} ${styles.green}`} />
        </div>
      </div>
    </>
  );
};

export default ListCard;
