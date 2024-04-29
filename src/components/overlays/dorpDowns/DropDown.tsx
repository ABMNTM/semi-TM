import React, { FC, HTMLAttributes, useState } from "react";
import TextIcon from "@cmp/UI/TextIcon";

import styles from "./DropDown.module.css";

interface OptionType {
  operation(): void;
  label: typeof TextIcon;
}

interface PropType extends HTMLAttributes<HTMLDivElement> {
  options: Array<OptionType>;
}

const DropDown: FC<PropType> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.DropDown}>
      <ul className={styles.OptionList}>
        {options.map((item) => (
          <li key={Math.random()}>
            {
              // TODO : implement it.
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
