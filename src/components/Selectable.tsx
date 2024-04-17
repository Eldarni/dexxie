import React from 'react';

export default (props) => {

    //store the index of the item that was select last - used as the origin point for a shift-select
    const [lastSelectedItem, setLastSelectedItem] = React.useState();

    //selection mode (if a long press is detected the future single clicks will be handled as a selection), once all items have been unselected the selection mode will reset
    const [selectionMode, setSelectionMode] = React.useState('normal'); //'normal' or 'quick'

    const longPressTimerRef = React.useRef<number>();

    //get the key prop for each item in the selectable zone
    const selectableItemKeys = props.children?.map(child => child.key);

    //cast the selection to a set, then back to an array to quickly remove duplicates
    const onSelectionChange = (selection) => {

        //if the selection is empty then reset the selection mode
        if (selection.length === 0) {
            setSelectionMode('normal');
        }

        //
        props.onSelectionChange([...new Set(selection)]);

    }

    //
    const onMouseDownHandler = function(event) {

        //if its quick select mode then just update the selection
        if (selectionMode === 'quick') {

            //if the item has already been selected, then remove it from the selection
            if (props.selectedItems.includes(this.key)) {
                onSelectionChange(props.selectedItems.filter((value) => {
                    return value !== this.key;
                }));
            } else {
                onSelectionChange([...props.selectedItems, ...[this.key]]);
            }

            //
            return;

        }

        //get the index of the item we just clicked on
        const thisSelectedItem = selectableItemKeys.indexOf(this.key);

        //
        let newSelection: string[] = [];

        //if it's a standard unmodified click - make the selection just this item
        if (event.shiftKey === false) {
            newSelection.push(this.key);
        }

        //if we are using a shift modifier then get all the items between the last selected item and the item that was just clicked
        if (event.shiftKey === true && lastSelectedItem !== undefined) {
            for (var i = Math.min(lastSelectedItem, thisSelectedItem); i <= Math.max(lastSelectedItem, thisSelectedItem); i++) {
                newSelection.push(selectableItemKeys[i])
            }
        }

        //add or remove the clicked child into our list
        if (event.ctrlKey === true) {

            //if the item has already been selected, then remove it from the selection, and call it done
            if (props.selectedItems.includes(this.key)) {
                onSelectionChange(props.selectedItems.filter((value) => {
                    return value !== this.key;
                }));
                return;
            } else {
                newSelection.push(this.key);
            }

        }

        //ctrl adds the new items to the selection - no ctrl replaces the entire selection
        if (event.ctrlKey === true) {
            onSelectionChange([...props.selectedItems, ...newSelection]);
        } else {
            onSelectionChange(newSelection);
        }

        //...and then update it for next time?
        if (event.shiftKey === false) {
            setLastSelectedItem(thisSelectedItem);
        }

        //if the mouse is held down then set the selection mode to quick - this allows the selection to be updated by clicking or tapping on items
        longPressTimerRef.current = setTimeout(() => {
            setSelectionMode('quick');
        }, 500);
    
    }

    //
    const onMouseUpHandler = function(event) {
        clearTimeout(longPressTimerRef.current);
    }

    //
    return (
        <React.Fragment>
            {props.children?.map(child => {
                return React.cloneElement(child, { 'selected' : (props.selectedItems.includes(child.key)), 'onMouseDown' : onMouseDownHandler.bind(child), 'onMouseUp' : onMouseUpHandler.bind(child) });
            })}
        </React.Fragment>
    );

}
