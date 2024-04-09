import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Avatar from "./Avatar";

import styles from "./ProjectCard.module.css";

interface propType {
  title: string;
}

const ProjectCard = (props: propType) => {
  const projectLink = "/a/#";
  return (
    <>
      <Link className={styles.container} href={projectLink}>
        <div className={styles.header}>
          <FontAwesomeIcon icon={faStar} width={20} height={20} />
          <h3>{props.title}</h3>
        </div>
        <div className={styles.body}>
          <Avatar status="border" />
        </div>
      </Link>
    </>
  );
};

export default ProjectCard;
