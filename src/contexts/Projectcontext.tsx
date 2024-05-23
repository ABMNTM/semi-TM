import React, { FC, ReactNode, createContext, useState } from "react";
import { ListType, TaskOuterType } from "../types/ListType";

interface ContextType {
    // All data
    lists: Array<ListType>;
    // List
    SetListLst(lists: Array<ListType>): void;
    AddList(list: ListType): void;
    DeleteList(id: string): void;
    UpdateList(list: ListType): void;
    // Task
    AddTask(Lid: string, task: TaskOuterType): void;
    DeleteTask(id: string, Lid: string): void;
    UpdateTask(task: TaskOuterType, Lid: string): void;
}

export const ProjectContext = createContext<ContextType>({
    lists: [],
    //
    SetListLst(lists) {},
    AddList(list) {},
    DeleteList(id) {},
    UpdateList(list) {},
    //
    AddTask(Lid, task) {},
    DeleteTask(id) {},
    UpdateTask(task, Lid) {},
    // comment ....
})

export const ProjectProvider : FC<{children: ReactNode}> = ({ children }) => {
  const [lists, setList] = useState<Array<ListType>>([]);

  const setListLst = (lists: Array<ListType>) => {
    setList(lists);
  };

  const addList = (newList: ListType) => {
    setList((prevlists) => [...prevlists, newList]);
  };

  const deleteList = (id: string) => {
    setList((prevlists) => {
      const newLists = prevlists.filter((item) => item.id !== id);
      return newLists;
    });
  };

  const updateList = (list: ListType) => {
    setList((prevlists) => {
      const newlists = prevlists.map((item) =>
        item.id === list.id ? list : item
      );
      return newlists;
    });
  };

  const addTask = (Lid: string, task: TaskOuterType) => {
    setList((prevLists) => {
      const listIndex = prevLists.findIndex(item => item.id === Lid);
      prevLists[listIndex].tasks.push(task);
      return prevLists;
    });
  };

  const deleteTask = (id: string, Lid: string) => {
    setList((prevLists) => {
      const listIndex = prevLists.findIndex(item => item.id === Lid);
      const newTasks = prevLists[listIndex].tasks.filter(item => item.id !== id)
      prevLists[listIndex].tasks = newTasks;
      return prevLists;
    });
  };

  const updateTask = (task: TaskOuterType, Lid: string) => {
    setList((prevLists) => {
      const listIndex = prevLists.findIndex( item => item.id === Lid);
      const TaskIndex = prevLists[listIndex].tasks.findIndex(item => item.id === task.id)
      prevLists[listIndex].tasks[TaskIndex] = task
      return prevLists;
    });
  }

  return (
    <ProjectContext.Provider value={{
        lists: lists,
        SetListLst: setListLst,
        AddList: addList,
        DeleteList: deleteList,
        UpdateList: updateList,
        AddTask: addTask,
        DeleteTask: deleteTask,
        UpdateTask: updateTask,
    }}>
        {children}
    </ProjectContext.Provider>
  )
}