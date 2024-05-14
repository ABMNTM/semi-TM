import React, { FC, ReactNode, createContext, useState } from "react";

interface ContextType {
  isActive: boolean;
  onSwitch(): void;
}

export const SwitchCtx = createContext<ContextType>({
  isActive: false,
  onSwitch: () => {},
});

interface PropType {
  children: ReactNode;
}

const SProvider: FC<PropType> = ({ children }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const onTuggle = () => {
    setIsActive((ps) => !ps);
  };
  return (
    <SwitchCtx.Provider value={{ isActive: isActive, onSwitch: onTuggle }}>
      {children}
    </SwitchCtx.Provider>
  );
};

export default SProvider;
