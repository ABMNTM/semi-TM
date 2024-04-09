import React from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import styles from "@sty/projectID/tasks.module.css";

interface propType {}

const Page = (props: propType) => {
  const router = useRouter();
  return (
    <>
      <div className={styles.container}>
        <aside className={styles.aside}>
          <div className={styles.home}>
            تسکولو
            <FontAwesomeIcon icon={faHouse} />
          </div>
        </aside>
      </div>
    </>
  );
};

export default Page;
