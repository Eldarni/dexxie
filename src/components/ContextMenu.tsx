
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
    const contextMenu = React.useRef<HTMLDivElement>(null);

    //
    let { xPos, yPos, showMenu } = useContextMenu(props.selector);
    
    //calculate the menu's offset so it renders in the correct place
    if (contextMenu.current !== null) {

        //
        const contextMenuParentBoundingClientRect = contextMenu.current.offsetParent.getBoundingClientRect();

        //
        yPos -= contextMenuParentBoundingClientRect.top;
        xPos -= contextMenuParentBoundingClientRect.left;

    }

    //
    return (
        <div ref={contextMenu} className="ContextMenu" style={{ top: `${yPos}px`, left: `${xPos}px` }}>
            {((showMenu) ? props.children : null)}
        </div>
    );
};

//
export const ContextMenuItem = (props) => {
    return ( <div className={`ContextMenuItem ${props.className}`} onClick={props.onClick} >{props.children}{((props.selected === true) ? <FontAwesomeIcon icon={faCheck} /> : null)}</div> );
};

//
export const ContextMenuDivider = (props) => {
    return (
        <div className="ContextMenuDivider"></div>
    );
};