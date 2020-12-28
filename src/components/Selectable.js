import React, { useState, useEffect } from 'react';

export default (props) => {

    //
    const toggleSelectionHandler = function(event) {

        //handle a "simple" toggle selection
        if (props.selectedItems.includes(this.key)) {
            props.onSelectionChange(props.selectedItems.filter((value) => {
                return value !== this.key;
            }));
        } else {
            props.onSelectionChange([...props.selectedItems, this.key]);
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
