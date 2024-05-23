import React, {
  useEffect,
  FC,
  HTMLAttributes,
  useContext,
  useState,
} from "react";
import BoardCard from "@cmp/data-display/BoardCard";
import CustomAxios from "../../helpers/axios";
import BoardType from "../../types/BoardType";
import toast from "react-hot-toast";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TextIcon from "@cmp/UI/TextIcon";
import { SwitchCtx } from "../../contexts/SwitchContext";

import styles from "./BoardContainer.module.css";
import { BoardContext } from "../../contexts/BoardContext";
import BoardCreatorModal from "@cmp/modals/BoardCreatorModal";

interface PropType extends HTMLAttributes<HTMLElement> {}

interface EmptyBoardPropType {
  msg: string;
}

export const EmptyBoard: FC<EmptyBoardPropType> = (props) => {
  return <div className={styles.EmptyBoard}>{props.msg}</div>;
};

const BoardContainer: FC<PropType> = (props) => {
  const [visualBoards, setVisualBoards] = useState<Array<BoardType>>([]); // to define which boards will be shown.
  const [boardModalShow, setBoardModalShow] = useState<boolean>(false);

  const { isActive: isActive } = useContext(SwitchCtx);

  const BCtx = useContext(BoardContext);

  const CreateBoard = async (BaseUrl: string = "/board/", name: string) => {
    try {
      const res = await CustomAxios.post(BaseUrl, {
        name: name,
      });
      const newBoard = res.data as BoardType;
      BCtx.AddBoard(newBoard);
    } catch (e) {
      console.error(e);
      toast.error("خطا هنگام ساخت سازمان جدید");
    }
  };

  const getDataList = async (BaseUrl: string = "/board/") => {
    try {
      const res = await CustomAxios.get(BaseUrl);
      const allBoards = res.data as Array<BoardType>;
      BCtx.SetBoardList(allBoards);
    } catch (e) {
      console.log(e);
      toast.error("خطا هنگام واکشی لیست داده");
    } finally {
    }
  };

  useEffect(() => {
    getDataList();
  }, []);

  useEffect(() => {
    setVisualBoards(BCtx.boards.filter((item) => item.isArcheved === isActive));
  }, [isActive, BCtx.boards]);


  const Modals = (
    <>
      <BoardCreatorModal show={boardModalShow} onHide={() => setBoardModalShow(false)} />
    </>
  )

  const HandleBoardCreateShow = () => {
    console.log('board create showed or no?');
    setBoardModalShow(true)
  }

  return (
    <div className={styles.manager}>
      <div className={styles.container}>
        {BCtx.boards.length === 0 ? (
          <EmptyBoard msg="لطفا برای شروع یک سازمان بسازید" />
        ) : (
          visualBoards.map((item) => <BoardCard key={item.id} data={item} />)
        )}
        <button onClick={() => setBoardModalShow(true)} className={styles.PageButton + " " + styles.createBoard}>
          <TextIcon leftIcons={[faPlus]} text="ایجاد سازمان" />
        </button>
      </div>
      {Modals}
    </div>
  );
};

export default BoardContainer;
