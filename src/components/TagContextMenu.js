
//
import React from 'react';

//
import ContextMenu, { ContextMenuItem, ContextMenuDivider } from './ContextMenu';


//
export default (props) => {

    //
    return (
        <ContextMenu selector={props.selector}>
            <ContextMenuItem selected>Owned</ContextMenuItem>
            <ContextMenuItem>Shiny</ContextMenuItem>
            <ContextMenuItem>Lucky</ContextMenuItem>
            <ContextMenuDivider />
            <ContextMenuItem>Clear All Tags</ContextMenuItem>
        </ContextMenu>
    );

}