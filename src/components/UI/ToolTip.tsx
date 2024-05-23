import React, { FC, ReactElement } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// A customized ToolTip conponent.


interface ToolTipPropType {
    Text: string; // next step : implement it with type ReactNode (bold and italic mode ... )
    children: ReactElement;
    id: string | undefined;
}

const ToolTip : FC<ToolTipPropType> = ({ Text, children, id }) => {
    return (
        <OverlayTrigger overlay={<Tooltip id={id} >{ Text }</Tooltip>}>
            {children}
        </OverlayTrigger>
    );
}