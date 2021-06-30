
//
import React from 'react';

//
export default () => {

    //
    const [xPos, setXPos] = React.useState('0px');
    const [yPos, setYPos] = React.useState('0px');

    //
    const [showMenu, setShowMenu] = React.useState(false);

    //
    const handleContextMenu = React.useCallback((event) => {

        //
        event.preventDefault();

        //
        setXPos(`${event.pageX}px`);
        setYPos(`${event.pageY}px`);

        //
        setShowMenu(true);

    }, [setXPos, setYPos]);

    //hide the context menu when we click elsewhere
    const handleClick = React.useCallback(() => {
        showMenu && setShowMenu(false);
    }, [showMenu]);

    //
    React.useEffect(() => {

        //
        document.addEventListener('click', handleClick);
        document.addEventListener('contextmenu', handleContextMenu);

        //
        return () => {
            document.addEventListener('click', handleClick);
            document.removeEventListener('contextmenu', handleContextMenu);
        };

    });

    //
    return { xPos, yPos, showMenu };

};