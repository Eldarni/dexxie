
//
import React from 'react';

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//
export default (props) => {
    return (
        <button className="btn" type="button" onClick={props.onClick}>
            {((props.icon !== undefined) ? <FontAwesomeIcon className="btn-icon" icon={props.icon} /> : '')}
            <span className="btn-label">{props.children}</span>
        </button>
    );
}