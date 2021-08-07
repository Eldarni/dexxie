
//
import React from 'react';

//
import ContextMenu, { ContextMenuItem, ContextMenuDivider } from './ContextMenu';

//
import { faSquare, faMinusSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'

//
export default (props) => {

    //
    return (
        <ContextMenu selector={props.selector}>
            <ContextMenuItem icon={faSquare}>Owned</ContextMenuItem>
            <ContextMenuItem icon={faMinusSquare}>Shiny</ContextMenuItem>
            <ContextMenuItem icon={faCheckSquare}>Lucky</ContextMenuItem>
            <ContextMenuDivider />
            <ContextMenuItem>Clear All Tags</ContextMenuItem>
        </ContextMenu>
    );

}