import React, { FC, ReactNode, createContext, useState } from "react";
import { TaskInnerType } from "../types/ListType";
import customAxios, { baseURL } from "../helpers/axios";

//      this component uses for variant
//      and many choosable components
//      like task modal, etc.

interface TaskCtxType {
  task: TaskInnerType;
  show: boolean;
  onChoose(id: number | string): void;
  onHide(): void;
}

export const ModalContext = createContext<TaskCtxType>({
  task: {id:'', context:'', status: 'DI', percentage: 0, date_created: new Date(), dead_line: new Date(), related_list: ''},
  show: false,
  onChoose: (id: number | string) => {},
  onHide: () => {},
});

export const MCProvider: FC<{ children: ReactNode }> = ({ children }) => {
  
  const activeTaskModal = async (id: string) => {
    const data = await RetrieveTask(id);
    setTask(data);
    setShow(true);
  };

  const closeTaskModal = () => {
    setShow(false);
  };
  
  const RetrieveTask = async (id: string) => {
    const url = baseURL + '/list/task/' + id;
    const res = await customAxios.get(url);
    return res.data;
  }

  const [Task, setTask] = useState<TaskInnerType>({id:'', context:'', status: 'DI', percentage: 0, date_created: new Date(), dead_line: new Date(), related_list: ''})

  const [show, setShow] = useState(false);

  return (
    <>
      <ModalContext.Provider
        value={{
          task: Task,
          show: show,
          onChoose: activeTaskModal,
          onHide: closeTaskModal,
        }}
      >
        {children}
      </ModalContext.Provider>
    </>
  );
};
