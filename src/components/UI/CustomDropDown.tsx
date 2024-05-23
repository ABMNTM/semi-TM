import React, { FC, ReactElement, ReactNode, forwardRef } from "react";
import { Dropdown } from "react-bootstrap";

interface PropType {
  Toggle: ReactElement;
  Menu: ReactElement;
}

type RefType = React.Ref<HTMLDivElement>;

interface TogglePropType {}

interface MenuPropType {}

const CustomDropDown: FC<PropType> = ({ Toggle, Menu }) => {
  

  return (
    <Dropdown>
      <Dropdown.Toggle>aliii</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropDown;
