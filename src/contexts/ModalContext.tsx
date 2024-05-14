import React, { FC, ReactNode, createContext, useState } from "react";

// this component uses for variant
// and many choosable components
// like task modal, etc.

interface TaskCtxType {
  show: boolean;
  id: number | string;
  onChoose(id: number): void;
  onHide(): void;
}

export const ModalContext = createContext<TaskCtxType>({
  show: false,
  id: 0,
  onChoose: (id: number) => {},
  onHide: () => {},
});

export const MCProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const activeTaskModal = (id: number) => {
    setShow(true);
    setId(id);
  };
  const closeTaskModal = () => {
    setShow(false);
  };
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  return (
    <>
      <ModalContext.Provider
        value={{
          show: show,
          id: id,
          onChoose: activeTaskModal,
          onHide: closeTaskModal,
        }}
      >
        {children}
      </ModalContext.Provider>
    </>
  );
};
