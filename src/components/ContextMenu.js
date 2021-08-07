
//
import React from "react";

//
import useContextMenu from "../hooks/useContextMenu";

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

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
    return ( <div className="ContextMenuItem">{props.children}{((props.selected === true) ? <FontAwesomeIcon icon={faCheck} /> : null)}</div> );
};

//
export const ContextMenuDivider = (props) => {
    return (
        <div className="ContextMenuDivider"></div>
    );
};