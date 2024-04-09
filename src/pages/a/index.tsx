import React from "react";
import Head from "next/head";
import Nav from "@cmp/page-container/Nav";
import ProjectCard from "@cmp/data-display/ProjectCard";
import BoardContainer from "@cmp/page-container/BoardContainer";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "@sty/a/index.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>تسکولو | projects</title>
      </Head>
      <Nav />
      <BoardContainer />
    </>
  );
}
