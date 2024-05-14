import React, { Children, FC, ReactNode, createContext, useState } from "react";
import BoardType from "../types/BoardType";

interface ContextType {
  boards: Array<BoardType>;
  SetBoardList(boards: Array<BoardType>): void;
  AddBoard(board: BoardType): void;
  DeleteBoard(id: number): void;
  UpdateBoard(board: BoardType): void;
}

export const BoardContext = createContext<ContextType>({
  boards: [],
  SetBoardList: (boards) => {},
  AddBoard: (board) => {},
  DeleteBoard: (id) => {},
  UpdateBoard: (board) => {},
});

export const BProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [boards, setBoards] = useState<Array<BoardType>>([]);
  const SetBoardList = (boards: Array<BoardType>) => {
    setBoards(boards);
  };
  const AddBoard = (board: BoardType) => {
    setBoards((prevBoards) => [...prevBoards, board]);
  };
  const DeleteBoard = (id: number) => {
    setBoards((prevBoards) => {
      const newBoards = prevBoards.filter((item) => item.id !== id);
      return newBoards;
    });
  };
  const UpdateBoard = (board: BoardType) => {
    setBoards((prevBoards) => {
      const newBoards = prevBoards.map((item) =>
        item.id === board.id ? board : item
      );
      return newBoards;
    });
  };
  return (
    <BoardContext.Provider
      value={{
        boards: boards,
        SetBoardList: SetBoardList,
        AddBoard: AddBoard,
        DeleteBoard: DeleteBoard,
        UpdateBoard: UpdateBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
