import React, { useCallback, useContext, useEffect, useState } from "react";
import Head from "next/head";
import Nav from "@cmp/page-container/Nav";
import BoardType from "../../types/BoardType";
import BoardContainer from "@cmp/page-container/BoardContainer";
import SwitchContext, { SwitchCtx } from "../../contexts/SwitchContext";

import styles from "@sty/a/index.module.css";
import CustomAxios from "../../helpers/axios";
import toast from "react-hot-toast";

export default function Home() {
  // const data = [
  //   {
  //     id: 1,
  //     name: "test name",
  //     description: "test desc",
  //     date_created: new Date(),
  //     projects: [
  //       {
  //         id: 1,
  //         name: "taskulu",
  //         description: "test",
  //         date_created: new Date(),
  //       },
  //       {
  //         id: 3,
  //         name: "Azemubu",
  //         description: "test",
  //         date_created: new Date(),
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "test name",
  //     description: "test desc",
  //     date_created: new Date(),
  //     projects: [
  //       {
  //         id: 14,
  //         name: "udemy",
  //         description: "test",
  //         date_created: new Date(),
  //       },
  //     ],
  //   },
  // ];

  const [boards, setBoards] = useState<Array<BoardType>>([]); // to store all board
  const [dataLoaded, setDataLoaded] = useState<boolean>(true);

  const getDataList = async (BaseUrl: string = "/board/") => {
    try {
      setDataLoaded(false);
      const res = await CustomAxios.get(BaseUrl);
      setBoards(res.data);
    } catch (e) {
      console.log(e);
      toast.error("خطا هنگام واکشی لیست داده");
    } finally {
      setDataLoaded(true);
    }
  };

  const CreateBoard = async (BaseUrl: string = "/board/", name: string) => {
    // /Board/
    try {
      const res = await CustomAxios.post(BaseUrl, {
        name: name,
      });
      setBoards((prevState) => [...prevState, res.data]);
    } catch (e) {
      console.error(e);
      toast.error("خطا هنگام ساخت سازمان جدید");
    }
  };

  const UpdateBoard = async (
    BaseSubUrl: string = "/board/",
    board: BoardType
  ) => {
    const url = BaseSubUrl + board.id + "/";

    try {
      const res = await CustomAxios.patch(url, board);

      setBoards((prevBoards) => {
        let edited = prevBoards.find((item) => item.id === board.id);
        if (edited) edited.name = res.data.name;
        return prevBoards;
      });
    } catch (error) {
      console.error(error);
      toast.error("خطا در بروزرسانی نام سازمان");
    }
  };

  const DeleteBoard = async (BaseUrl: string = "/board/", id: number) => {
    const url = BaseUrl + id + "/";
    try {
      const res = await CustomAxios.delete(url);
    } catch (error) {
      console.error(error);
      toast.error("خطا در حذف سازمان");
    }
  };

  const UpdateBoardName = async (BaseUrl: string, name: string, id: number) => {
    const url = BaseUrl + id;
    try {
      const res = CustomAxios.patch(url, { name: name });
    } catch (error) {}
  };

  useEffect(() => {
    getDataList();
  }, []);

  return (
    <SwitchContext>
      <Head>
        <title>تسکولو | projects</title>
      </Head>
      {dataLoaded ? (
        <>
          <Nav />
          <BoardContainer onCreate={CreateBoard} boards={boards} />
        </>
      ) : (
        " Loading"
      )}
    </SwitchContext>
  );
}
