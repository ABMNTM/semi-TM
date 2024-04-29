import React, { useCallback, HTMLAttributes } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Avatar from "./Avatar";

import styles from "./ProjectCard.module.css";
import { isASCII } from "../../helpers/helpers";

interface propType extends HTMLAttributes<HTMLElement> {
  ID: string | number;
  isStared: boolean;
  title: string;
}

const ProjectCard = (props: propType) => {
  const projectLink = "/a/" + props.ID + "/";

  const isAscii = isASCII(props.title);

  return (
    <Link className={styles.container} href={projectLink}>
      <div
        className={styles.header}
        style={{ justifyContent: isAscii ? "flex-start" : "space-between" }}
      >
        <FontAwesomeIcon
          color={props.isStared ? "#ffd700" : ""}
          icon={faStar}
          width={20}
          height={20}
        />
        <h5>{props.title}</h5>
      </div>
      <div className={styles.body}>
        <Avatar color="#343008" name="CD" status="border" />
      </div>
    </Link>
  );
};

export default ProjectCard;
