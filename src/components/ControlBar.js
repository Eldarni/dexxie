
//
import React from 'react';

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faCheckDouble, faTimes, faTh, faThLarge, faSquare, faCaretDown } from '@fortawesome/free-solid-svg-icons'

//
export default (props) => {

    //
    return (
        <div className="control-bar">

            <div className="control-group">
                <div className="control-button" onClick={props.handleSelectAll} title="Select all"><FontAwesomeIcon size="lg" icon={faCheckDouble} /></div>
                <div className="control-button" onClick={props.handleClearAll} title="Clear All"><FontAwesomeIcon size="lg" icon={faTimes} /></div>
            </div>

            <div className="control-group">
                <div class="SearchBar">
                    <div class="ProfileSwitcher">National Dex <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon></div>
                    <input type="search" onChange={props.search} value={props.searchString} placeholder="Search: e.g. kanto grass" />
                </div>
            </div>

            <div className="control-group">
                <div className="control-button" onClick={() => props.setDisplayMode('compact')}   title="Compact"><FontAwesomeIcon size="lg" icon={faTh} /></div>
                <div className="control-button" onClick={() => props.setDisplayMode('condensed')} title="Condensed"><FontAwesomeIcon size="lg" icon={faThLarge} /></div>
                <div className="control-button" onClick={() => props.setDisplayMode('standard')}  title="Standard"><FontAwesomeIcon size="lg" icon={faSquare} /></div>
            </div>

            <div className="control-group">
                <div className="control-button" onClick={props.handleScrollToTop} title="Scroll To Top"><FontAwesomeIcon size="lg" icon={faAngleUp} /></div>
            </div>

        </div>
    );

}
