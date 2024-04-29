import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Aside from "@cmp/page-container/Aside";
import ListCard, { taskType } from "@cmp/data-display/ListCard";
import SearchBar from "@cmp/forms/SearchBar";
import Head from "next/head";

import styles from "@sty/a/projectID/index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import Switch from "@cmp/UI/Switch";
import Avatar from "@cmp/data-display/Avatar";
import ListCreator from "@cmp/forms/ListCreator";

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

  const projectDATA = [
    {
      id: 1,
      name: "taskulu",
      tasks: [...dummyTasks],
    },
    {
      id: 2,
      name: "پیش فرض",
      tasks: [...dummyTasks],
    },
    {
      id: 3,
      name: "عازم",
      tasks: [...dummyTasks],
    },
    {
      id: 4,
      name: "عازم",
      tasks: [...dummyTasks],
    },
  ];

  return (
    <>
      <Head>
        <title>تسکولو | taskulu</title>
      </Head>
      <div className={styles.container}>
        <Aside projectName="پروژه پیش فرض" />
        <div className={styles.leftSide}>
          <nav className={styles.nav}>
            <div className={styles.NAVaccount}>
              <Switch />
              <SearchBar placeholder="جستجو ..." />
              <Avatar color="#995384" name="AB" status="dot" />
            </div>
            <div className={styles.NAVpagination}>
              {/* از اقای شمس بپرس بزنی یا نه */}
              <FontAwesomeIcon icon={faGear} />
              <FontAwesomeIcon icon={faPlus} />
              <div className={styles.DefaultPage}>
                {"صفحه پیش فرض"}
                {/* bottom blue */}
                <div></div>
              </div>
            </div>
          </nav>
          <main className={styles.taskContainer}>
            {projectDATA.map((list) => (
              <ListCard key={list.id} title={list.name} tasks={list.tasks} />
            ))}
            <ListCreator />
          </main>
        </div>
      </div>
    </>
  );
};

export default Page;
