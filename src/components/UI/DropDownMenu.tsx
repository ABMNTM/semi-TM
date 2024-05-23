import React, { FC, ReactNode } from "react";

import styles from './DropDownMenu.module.css';

interface OptionType {
    text: ReactNode;
    op(...arr: any[]) : any;
}

interface PropType {
    options: OptionType[];
}

const DropDownMenu : FC<PropType> = (props) => {
    return (
        <div className={styles.menu}>
            {props.options.map(item => <div className={styles.item} onClick={item.op}>{item.text}</div>)}
        </div>
    )
}

export default DropDownMenu