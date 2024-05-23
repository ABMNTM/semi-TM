import React, { FC, HTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import styles from './Select.module.css';

interface PropType extends HTMLAttributes<HTMLDivElement> {
    text: string;
}

const Select : FC<PropType> = (props) => {
    return (
        <div className={props.className + ' ' + styles.Container}>
            <FontAwesomeIcon className={styles.Icon} icon={faChevronDown} />
            {props.text}
        </div>
    )
}

export default Select