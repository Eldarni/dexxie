
import React, { useRef, useState, useEffect } from 'react';

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

//
export default (props) => {

    //
    const dropdown = useRef(null);

    //
    const [isActive, setIsActive] = useState(false);
  
    //
    useEffect(() => {

        //hide the visibility if we click outside the dropdown
        const pageClickEvent = (e) => {
            if (dropdown.current !== null && !dropdown.current.contains(e.target)) {
                setIsActive(false);
            }
        };

        //if the dropdown menu is visible, then listen out for any click events
        if (isActive) {
            window.addEventListener('click', pageClickEvent);
        }

        //remember to tear down the event listener when done
        return () => {
            window.removeEventListener('click', pageClickEvent);
        }

    }, [isActive]);

    //
    return (
        <div className="menu-container">

            <button className="menu-trigger" onClick={() => setIsActive(!isActive)}>
                <span>{props.label}</span>
                <FontAwesomeIcon size="lg" icon={faCaretDown} />
            </button>

            <nav className={`menu ${isActive ? 'active' : 'inactive'}`} ref={dropdown}>
                {props.children}
            </nav>

        </div>
    );

  };

//
export const DropdownMenuItem = (props) => {
    return (
        <div><a href="/messages" onClick={props.onClick}>{props.label}</a></div>
    );
};

//
export const DropdownMenuDivider = (props) => {
    return (
        <div className="divider"></div>
    );
};
