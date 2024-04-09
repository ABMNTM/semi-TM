import React, { useEffect } from "react";
import axios, { Axios, AxiosError } from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectCard from "@cmp/data-display/ProjectCard";

import styles from "./BoardContainer.module.css";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";

interface projectType {
  id: number;
  name: string;
  description: string;
  date_created: Date;
}

interface boardType {
  id: number;
  name: string;
  description: string;
  date_created: Date;
  projects: Array<projectType>;
}

const BoardContainer = () => {
  const boards = (): Array<boardType> => {
    // appearence design mode
    return [
      {
        id: 1,
        name: "test name",
        description: "test desc",
        date_created: new Date(),
        projects: [
          {
            id: 1,
            name: "taskulu",
            description: "test",
            date_created: new Date(),
          },
        ],
      },
      {
        id: 2,
        name: "test name",
        description: "test desc",
        date_created: new Date(),
        projects: [
          {
            id: 14,
            name: "udemy",
            description: "test",
            date_created: new Date(),
          },
        ],
      },
      {
        id: 3,
        name: "test name",
        description: "test desc",
        date_created: new Date(),
        projects: [
          {
            id: 4,
            name: "taskulu",
            description: "test",
            date_created: new Date(),
          },
        ],
      },
    ];
    // try {
    //   const token = localStorage.getItem("access");
    //   if (token) {
    //     const response = await axios.get("http://localhost:8000/board/", {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("access"),
    //       },
    //     });
    //     return await response.data;
    //   } else {
    //     console.log(token);
    //   }
    // } catch (e: unknown) {
    //   const knownErr = e as AxiosError;
    //   console.log(knownErr);
    //   // toast.error("dummy error");
    // }
  };

  const data = boards();

  return (
    <div className={styles.manager}>
      <div className={styles.container}>
        {data.map((item) => (
          <div key={item.id}>
            <div key={item.id} className={styles.boardHeader}>
              <FontAwesomeIcon icon={faBuilding} />
              <h4>{item.name}</h4>
            </div>
            <div key={item.id} className={styles.projectContainer}>
              {item.projects.map((item) => (
                <ProjectCard key={item.id} title={item.name} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardContainer;
