
//
import React from 'react';

//
import ContextMenu, { ContextMenuItem, ContextMenuDivider } from './ContextMenu';

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faMinusSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'

//
export default (props) => {

    //
    return (
        <ContextMenu selector={props.selector}>
            <ContextMenuItem><FontAwesomeIcon size="lg" icon={faSquare} /> Owned</ContextMenuItem>
            <ContextMenuItem><FontAwesomeIcon size="lg" icon={faMinusSquare} /> Shiny</ContextMenuItem>
            <ContextMenuItem><FontAwesomeIcon size="lg" icon={faCheckSquare} /> Lucky</ContextMenuItem>
            <ContextMenuDivider />
            <ContextMenuItem>Clear All Tags</ContextMenuItem>
        </ContextMenu>
    );

}