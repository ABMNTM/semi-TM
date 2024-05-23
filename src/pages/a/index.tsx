import React, { useCallback, useContext, useEffect, useState } from "react";
import Head from "next/head";
import Nav from "@cmp/page-container/Nav";
import BoardContainer from "@cmp/page-container/BoardContainer";
import SProvider, { SwitchCtx } from "../../contexts/SwitchContext";
import { BProvider } from "../../contexts/BoardContext";
import CustomDropDown from "@cmp/UI/CustomDropDown";

export default function Home() {
  
  return (
    <SProvider>
      <BProvider>
        <Head>
          <title>تسکولو | projects</title>
        </Head>
        <Nav />
        <BoardContainer />
      </BProvider>
    </SProvider>
  );
}
