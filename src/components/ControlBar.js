
//
import React from 'react';

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faCheckDouble, faTimes } from '@fortawesome/free-solid-svg-icons'

//
import ProfileMenuWidget from './ProfileMenuWidget';
import TagMenuWidget from './TagMenuWidget';

//
export default (props) => {
    
    //
    return (
        <div className="control-bar">

            <ProfileMenuWidget currentProfile={props.currentProfile} setShowProfilesPopop={props.setShowProfilesPopop} />
            <TagMenuWidget setShowTagsPopop={props.setShowTagsPopop} />

            <div className="control-group">
                <div className="control-button" onClick={props.handleSelectAll} title="Select all"><FontAwesomeIcon size="lg" icon={faCheckDouble} /></div>
                <div className="control-button" onClick={props.handleClearAll} title="Clear All"><FontAwesomeIcon size="lg" icon={faTimes} /></div>
            </div>

            <div className="control-group">
                <input type="search" onChange={props.search} value={props.searchString} placeholder="Search: e.g. kanto grass" />
            </div>

            <div className="control-group">
                <div className="control-button" onClick={props.handleScrollToTop} title="Scroll To Top"  ><FontAwesomeIcon size="lg" icon={faAngleUp}   /></div>
            </div>

        </div>
    );

}
