import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListType, TaskOuterType } from "../../types/ListType";

import styles from "./ListCard.module.css";
import { faGear, faMessage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons/faGripVertical";
import { ModalContext } from "../../contexts/ModalContext";
import TextIcon from "@cmp/UI/TextIcon";
import TaskCreator from "@cmp/forms/TaskCreator";

interface TaskCardPropType {
  data: TaskOuterType;
  key?: number | string | undefined;
}

const TaskCard = ({ data }: TaskCardPropType) => {
  const ctx = useContext(ModalContext);
  
  return (
    <div className={styles.task} onClick={() => ctx.onChoose(data.id)}>
      <p dir='rtl' className={styles.taskContext}>
        {data.context}
      </p>
      <div className={styles.taskCommentCount}>
        {data.comment_count > 0 &&
        <TextIcon rightMargins="5px" text={data.comment_count.toString()} rightIcons={[faMessage]} />
      }
      </div>
    </div>
  );
};

interface propType extends ListType {
  key?: number | string | undefined;
}

const ListCard = (props: propType) => {
  const todos = props.tasks.filter((task) => task.status === "TD");
  const [todo_TC, setTodo_TC] = useState(false);

  const doings = props.tasks.filter((task) => task.status === "DI");
  const [doing_TC, setDoing_TC] = useState(false);

  const dones = props.tasks.filter((task) => task.status === "DN");
  const [done_TC, setDone_TC] = useState(false);


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.dragdropIcon}>
          <FontAwesomeIcon icon={faGripVertical} width={"9px"} />
        </div>
        <h5 className={styles.title}>{props.name}</h5>
        <div className={styles.settingIcon}>
          <FontAwesomeIcon icon={faGear} />
        </div>
      </div>
      <div className={styles.tasks}>
        <div className={styles.taskHeader}>
          <div className={styles.taskTitle}>
            <i>({todos.length})</i> Todo
          </div>
          <div onClick={() => setTodo_TC(true)} className={styles.AddTaskIcon}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        {todos.map((todo) => (
          <TaskCard key={todo.id} data={todo} />
        ))}
        {/* <div className={`${styles.statusBar} ${styles.red}`} /> */}
        { todo_TC && <TaskCreator status="TD" parentListId={props.id} onHide={() => setTodo_TC(false)} />}
      </div>
      <div className={styles.tasks}>
        <div className={styles.taskHeader}>
          <div className={styles.taskTitle}>
            <i>({doings.length})</i> Doing
          </div>
          <div onClick={() => setDoing_TC(true)} className={styles.AddTaskIcon}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        {doings.map((todo) => (
          <TaskCard key={todo.id} data={todo} />
        ))}
        {/* <div className={`${styles.statusBar} ${styles.yellow}`} /> */}
        {doing_TC && <TaskCreator status="DI" parentListId={props.id} onHide={() => setDoing_TC(false)} />}
      </div>
      <div className={styles.tasks}>
        <div className={styles.taskHeader}>
          <div className={styles.taskTitle}>
            <i>({dones.length})</i> Done
          </div>
          <div onClick={() => setDone_TC(true)} className={styles.AddTaskIcon}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        {dones.map((todo) => (
          <TaskCard key={todo.id} data={todo} />
        ))}
        {/* <div className={`${styles.statusBar} ${styles.green}`} /> */}
        {done_TC && <TaskCreator status="DN" parentListId={props.id} onHide={() => setDone_TC(false)} />}
      </div>
    </div>
  );
};

export default ListCard;
