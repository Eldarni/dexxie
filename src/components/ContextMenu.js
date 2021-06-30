
//
import React from "react";

//
import useContextMenu from "../hooks/useContextMenu";

//
export default (props) => {

    //
    const { xPos, yPos, showMenu } = useContextMenu();
  
    //
    return (
        <div className="ContextMenu" style={{ opacity: !showMenu ? 0 : 1, top: yPos, left: xPos }}>
            {props.children}  
        </div>
    );
};

//
export const ContextMenuItem = (props) => {
    return (
        <div className="ContextMenuItem">{props.children}</div>
    );
};

//
export const ContextMenuDivider = (props) => {
    return (
        <div className="ContextMenuDivider"></div>
    );
};