import React, { useState, useEffect } from 'react';

export default (props) => {

    //store the index of the item that was select last - used as the origin point for a shift-select
    const [lastSelectedItem, setLastSelectedItem] = useState();

    //get the key prop for each item in the selectable zone
    const selectableItemKeys = props.children.map(child => child.key);

    //
    const toggleSelectionHandler = function(event) {

        //get the index of the item we just clicked on
        const thisSelectedItem = selectableItemKeys.indexOf(this.key);

        //
        let newSelection = [];

        //if it's a standard unmodified click - make the selection just this item
        if (event.shiftKey == false) {
            newSelection.push(this.key);
        }

        //if we are using a shift modifier then get all the items between the last selected item and the item that was just clicked
        if (event.shiftKey == true && lastSelectedItem !== undefined) {
            for (var i = Math.min(lastSelectedItem, thisSelectedItem); i <= Math.max(lastSelectedItem, thisSelectedItem); i++) {
                newSelection.push(selectableItemKeys[i])
            }
        }

        //add or remove the clicked child into our list
        if (event.ctrlKey == true) {

            //if the item has already been selected, then remove it from the selection
            if (props.selectedItems.includes(this.key)) {
                newSelection = props.selectedItems.filter((value) => {
                    return value !== this.key;
                });

                //
                props.onSelectionChange(newSelection);
                return;

            } else {
                newSelection.push(this.key);
            }

        }

        //ctrl adds the new items to the selection - no ctrl replaces the entire selection
        if (event.ctrlKey == true) {
            props.onSelectionChange([...props.selectedItems, ...newSelection]);
        } else {
            props.onSelectionChange(newSelection);
        }

        //...and then update it for next time?
        if (event.shiftKey == false) {
            setLastSelectedItem(thisSelectedItem);
        }

    }

    //
    return (
        <React.Fragment>
            {React.Children.map(props.children, child => {
                return React.cloneElement(child, { 'selected' : (props.selectedItems.includes(child.key)), 'onToggleSelection' : toggleSelectionHandler.bind(child) });
            })}
        </React.Fragment>
    );

}
