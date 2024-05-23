import React, { FC, ReactNode, createContext, useState } from "react";
import BoardType, { ProjectType } from "../types/BoardType";

interface ContextType {
  boards: Array<BoardType>;
  SetBoardList(boards: Array<BoardType>): void;
  AddBoard(board: BoardType): void;
  DeleteBoard(id: string): void;
  UpdateBoard(board: BoardType): void;
  AddProject(bid: string, project: ProjectType): void;
  DeleteProject(bid: string, id: string): void;
  UpdateProject(Project: ProjectType): void;
}

export const BoardContext = createContext<ContextType>({
  boards: [],
  SetBoardList: (boards) => {},
  AddBoard: (board) => {},
  DeleteBoard: (id) => {},
  UpdateBoard: (board) => {},
  AddProject: (project) => {},
  DeleteProject: (bid, id) => {},
  UpdateProject: (Project) => {},
});

export const BProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [boards, setBoards] = useState<Array<BoardType>>([]);
  const SetBoardList = (boards: Array<BoardType>) => {
    setBoards(boards);
  };
  const AddBoard = (board: BoardType) => {
    setBoards((prevBoards) => [...prevBoards, board]);
  };
  const DeleteBoard = (id: string) => {
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
  const addProject = (bid: string, project: ProjectType) => {
    setBoards((prevBoards) => {
      const index = prevBoards.findIndex(item => item.id === bid);
      prevBoards[index].projects.push(project);
      return prevBoards;
    })
  }
  const deleteProject = (bid: string, id: string) => {
    setBoards((prevBoards) => {
      const index = prevBoards.findIndex(item => item.id === bid);
      const newProjects = prevBoards[index].projects.filter(item => item.id !== id);
      prevBoards[index].projects = newProjects;
      return prevBoards;
    })
  }
  const updateProject = (project: ProjectType) => {
    setBoards((prevBoards) => {
      let found = false;
      for(let i = 0; !found && i <  prevBoards.length; i++) {
        for(let j = 0;!found && j < prevBoards[i].projects.length; j++) {
          if (prevBoards[i].projects[j].id === project.id) {
            prevBoards[i].projects[j] = project;
            found = true;
          }
        }
      }
      return prevBoards;
    })
  }
  return (
    <BoardContext.Provider
      value={{
        boards: boards,
        SetBoardList: SetBoardList,
        AddBoard: AddBoard,
        DeleteBoard: DeleteBoard,
        UpdateBoard: UpdateBoard,
        AddProject: addProject,
        DeleteProject: deleteProject,
        UpdateProject: updateProject
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
