
//
import React from 'react';

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faCheckDouble, faTimes, faTags, faCog } from '@fortawesome/free-solid-svg-icons'

//
import Button from './elements/Button';

//
export default (props) => {
    
    //
    return (
        <div className="control-bar">

            <div className="control-group">
                <div className="control-button" title="Select all"><FontAwesomeIcon size="lg" icon={faCheckDouble} /></div>
                <div className="control-button" title="Clear All"><FontAwesomeIcon size="lg" icon={faTimes} /></div>
            </div>

            <div className="control-group">
                <div className="control-button" title="Manage Tags"><FontAwesomeIcon size="lg" icon={faTags} /></div>
                <div className="control-button" title="Settings"><FontAwesomeIcon size="lg" icon={faCog} /></div>
            </div>

            <div className="control-group">
                <input type="search" onChange={props.search} value={props.searchString} placeholder="Search: e.g. kanto grass" />
            </div>

            <div className="control-group">
                <div className="control-button" title="Scroll Up"><FontAwesomeIcon size="lg" icon={faAngleUp} /></div>
                <div className="control-button" title="Scroll Down"><FontAwesomeIcon size="lg" icon={faAngleDown} /></div>
            </div>

        </div>
    );

}
