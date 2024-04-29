import React, {
  useEffect,
  FC,
  HTMLAttributes,
  useContext,
  useState,
} from "react";
import BoardCard from "@cmp/data-display/BoardCard";
import BoardType from "../../types/BoardType";
import {
  faBarChart,
  faBuilding,
  faChevronDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import TextIcon from "@cmp/UI/TextIcon";
import { SwitchCtx } from "../../contexts/SwitchContext";

import styles from "./BoardContainer.module.css";

interface PropType extends HTMLAttributes<HTMLElement> {
  boards: Array<BoardType>;
  onCreate(BaseUrl: string, name: string): Promise<void>;
}

interface EmptyBoardPropType {
  msg: string;
}

export const EmptyBoard: FC<EmptyBoardPropType> = (props) => {
  return <div className={styles.EmptyBoard}>{props.msg}</div>;
};

const BoardContainer: FC<PropType> = (props) => {
  const [visualBoards, setVisualBoards] = useState<Array<BoardType>>([]); // to define which boards will be shown.

  const { isActive: isActive } = useContext(SwitchCtx);

  useEffect(() => {
    setVisualBoards(
      props.boards.filter((item) => item.isArcheved === isActive)
    );
  }, [isActive, props.boards]);

  return (
    <div className={styles.manager}>
      <div className={styles.container}>
        {props.boards.length === 0 ? (
          <EmptyBoard msg="لطفا برای شروع یک سازمان بسازید" />
        ) : (
          visualBoards.map((item) => <BoardCard key={item.id} data={item} />)
        )}
        <button className={styles.PageButton + " " + styles.createBoard}>
          <TextIcon leftIcons={[faPlus]} text="ایجاد سازمان" />
        </button>
      </div>
    </div>
  );
};

export default BoardContainer;
