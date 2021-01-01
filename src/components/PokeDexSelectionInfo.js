
//
import React from 'react';

//
import Button from './elements/Button';

//
import { faTags, faCheckDouble, faTimes } from '@fortawesome/free-solid-svg-icons'

//
export default (props) => {

    //
    if (props.selectedItems.length == 0) {
        return null;
    }

    //
    return (
        <div className="selection-info">
            <Button icon={faTags} onClick={props.onAddTags}>Add tag ({props.selectedItems.length})</Button>
            <Button icon={faCheckDouble} onClick={props.onSelectAll}>Select all</Button>
            <Button icon={faTimes} onClick={props.onClearAll}>Clear All</Button>
        </div>
    );

}