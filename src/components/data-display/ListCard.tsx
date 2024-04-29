import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./ListCard.module.css";
import { faGear, faGrip, faPlus } from "@fortawesome/free-solid-svg-icons";
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
  key?: number | string | undefined;
  title: string;
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
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.dragdropIcon}>
            <FontAwesomeIcon icon={faGripVertical} width={"9px"} />
          </div>
          <h5 className={styles.title}>{props.title}</h5>
          <div className={styles.settingIcon}>
            <FontAwesomeIcon icon={faGear} />
          </div>
        </div>
        <div className={styles.tasks}>
          <div className={styles.taskHeader}>
            <div className={styles.taskTitle}>
              <i>({todos.length})</i> Todo
            </div>
            <div className={styles.AddTaskIcon}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          {todos.map((todo) => (
            <TaskTemp key={todo.id} title={todo.title} />
          ))}
          {/* <div className={`${styles.statusBar} ${styles.red}`} /> */}
        </div>
        <div className={styles.tasks}>
          <div className={styles.taskHeader}>
            <div className={styles.taskTitle}>
              <i>({doings.length})</i> Doing
            </div>
            <div className={styles.AddTaskIcon}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          {doings.map((todo) => (
            <TaskTemp key={todo.id} title={todo.title} />
          ))}
          {/* <div className={`${styles.statusBar} ${styles.yellow}`} /> */}
        </div>
        <div className={styles.tasks}>
          <div className={styles.taskHeader}>
            <div className={styles.taskTitle}>
              <i>({dones.length})</i> Done
            </div>
            <div className={styles.AddTaskIcon}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          {dones.map((todo) => (
            <TaskTemp key={todo.id} title={todo.title} />
          ))}
          {/* <div className={`${styles.statusBar} ${styles.green}`} /> */}
        </div>
      </div>
    </>
  );
};

export default ListCard;
