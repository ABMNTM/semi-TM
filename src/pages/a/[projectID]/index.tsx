import React, { useContext, useEffect, useState } from "react";
import Aside from "@cmp/page-container/Aside";
import TextInput from "@cmp/UI/TextInput";
import Head from "next/head";
import styles from "@sty/a/projectID/index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faGear,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Switch from "@cmp/UI/Switch";
import Avatar from "@cmp/data-display/Avatar";
import { TaskModal } from "@cmp/modals/TaskModal/TaskModal";
import { MCProvider, ModalContext } from "../../../contexts/ModalContext";
import { ProjectProvider } from "../../../contexts/Projectcontext";
import ListContainer from "@cmp/page-container/ListContainer";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

interface propType {}

const Page = (props: propType) => {
  const router = useRouter()
  const paramHandler = useSearchParams()
  const ProjectID = router.query.projectID as string;

  const Modals = () => {
    const ctx = useContext(ModalContext);
    return (
      <>
        <TaskModal show={ctx.show} onHide={ctx.onHide} />
      </>
    );
  };

  const projName = paramHandler.get("name");
  
  return (
    <MCProvider>
      <ProjectProvider>
        <Head>
          <title>تسکولو | taskulu</title>
        </Head>
        <div className={styles.container}>
          <Aside projectName={(projName === null) ? '' : projName} />
          <div className={styles.leftSide}>
            <nav className={styles.nav}>
              <div className={styles.NAVaccount}>
                <Switch icon={faArchive} />
                <TextInput
                  Icon={faMagnifyingGlass}
                  onChange={() => {}}
                  placeholder="جستجو ..."
                />
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
            <ListContainer ProjectID={ ProjectID } />
          </div>
        </div>
        <Modals />
      </ProjectProvider>
    </MCProvider>
  );
};

export default Page;
