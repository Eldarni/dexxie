
//
import React from "react";

//
import useContextMenu from "../hooks/useContextMenu";

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//
export default (props) => {

    //
    const { xPos, yPos, showMenu } = useContextMenu(props.selector);
  
    //
    return (
        <div className="ContextMenu" style={{ opacity: !showMenu ? 0 : 1, top: yPos, left: xPos }}>
            {props.children}  
        </div>
    );
};

//
export const ContextMenuItem = (props) => {
    if (props.icon !== undefined) {
        return ( <div className="ContextMenuItem">{props.children}<FontAwesomeIcon icon={props.icon} /></div> );
    }
    return ( <div className="ContextMenuItem">{props.children}</div> );
};

//
export const ContextMenuDivider = (props) => {
    return (
        <div className="ContextMenuDivider"></div>
    );
};