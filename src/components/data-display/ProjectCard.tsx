import React, { useCallback, HTMLAttributes, useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Avatar from "./Avatar";
import { isASCII } from "../../helpers/helpers";
import customAxios, { baseURL } from "../../helpers/axios";
import toast from "react-hot-toast";
import { BoardContext } from "../../contexts/BoardContext";
import { ProjectType } from "../../types/BoardType";

import styles from "./ProjectCard.module.css";
import { useRouter } from "next/router";
import { url } from "inspector";

interface propType extends HTMLAttributes<HTMLElement> {
  ID: string | number;
  isStared: boolean;
  title: string;
}

const ProjectCard = (props: propType) => {
  const router = useRouter()
  const projectLink = "/a/" + props.ID + "/?name=" + props.title;
  const boardCtx = useContext(BoardContext);
  const isAscii = isASCII(props.title);

  const starClickHandler = async () => {
    const data = await starHandler() as ProjectType;
    boardCtx.UpdateProject(data);
    console.log(data);
    toast.success("پروژه نشان دار شد")
  }

  const starHandler = async () => {
    try {
      const url = baseURL + '/board/project/' + props.ID + '/';
      const data = {isStared: !props.isStared}
      const res = await customAxios.patch(url, data);
      return res.data;
    } catch (error) {
      console.error(error)
      toast.error('خطا در بروزرسانی پروژه\n\nلطفا بعدا مجدد امتحان کنید');
    }
  }

  const taskPageNavigation = async () => {
    await router.push(projectLink);
  }
  
  return (
    <div className={styles.container} onClick={taskPageNavigation}>
      <div
        className={styles.header}
        style={{ justifyContent: isAscii ? "flex-start" : "space-between" }}
      >
        <FontAwesomeIcon
          className={props.isStared ? styles.stared : styles.notStared}
          onClick={starClickHandler}
          icon={faStar}
          width={20}
          height={20}
        />
        <h5>{props.title}</h5>
      </div>
      <div className={styles.body}>
        <Avatar color="#343008" name="CD" status="border" />
      </div>
    </div>
  );
};

export default ProjectCard;
