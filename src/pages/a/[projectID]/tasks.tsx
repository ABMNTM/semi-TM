import React from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import ListCard, { taskType } from "@cmp/data-display/ListCard";

import styles from "@sty/projectID/tasks.module.css";

type tasks = Array<taskType>;

interface propType {}

const Page = (props: propType) => {
  const router = useRouter();
  const dummyTasks: tasks = [
    {
      id: 1,
      title: "nonono ...",
      status: "TD",
    },
    {
      id: 2,
      title: "yeayeayea ...",
      status: "DI",
    },
    {
      id: 4,
      title: "ohohoh ...",
      status: "TD",
    },
    {
      id: 3,
      title: "hahaha ...",
      status: "DN",
    },
  ];
  return (
    <ListCard title="testing" width={300} height={700} tasks={dummyTasks} />
    // <>
    //   <div className={styles.container}>
    //     <aside className={styles.rightSide}>
    //       <div className={styles.home}>
    //         تسکولو
    //         <FontAwesomeIcon icon={faHouse} />
    //       </div>
    //     </aside>
    //     <div className={styles.leftSide}>
    //       <nav className={styles.nav}></nav>
    //       <main className={styles.taskContainer}>{/* tasks */}</main>
    //     </div>
    //   </div>
    // </>
  );
};

export default Page;
