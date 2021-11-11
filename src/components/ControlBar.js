
//
import React from 'react';
import { useRecoilState } from 'recoil';

//
import { displayModeState } from '../store';

//
import { useProfileState } from '../context/ProfileContext';

//
import ProfileSelectionMenu from './ProfileSelectionMenu';

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faCheckDouble, faTimes, faTh, faThLarge, faSquare, faCaretDown } from '@fortawesome/free-solid-svg-icons'

//
export default (props) => {

    //
    const [showProfileSwitcherMenu, setShowProfileSwitcherMenu] = React.useState(false);

    //
    const profileState   = useProfileState();
    const currentProfile = profileState.getCurrentProfile();

    //
    return (

        <div className="control-bar">

            <div className="control-group">
                <div className="control-button" onClick={props.handleSelectAll} title="Select all"><FontAwesomeIcon size="lg" icon={faCheckDouble} /></div>
                <div className="control-button" onClick={props.handleClearAll} title="Clear All"><FontAwesomeIcon size="lg" icon={faTimes} /></div>
            </div>

            <div className="control-group">
                <div className="SearchBar">
                    <div className="SearchBarInner">
                        <div className="ProfileSwitcher" onClick={()=>setShowProfileSwitcherMenu(!showProfileSwitcherMenu)}>{currentProfile.name} <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon></div>
                        <input type="search" onChange={props.search} value={props.searchString} placeholder="Search: e.g. kanto grass" />
                    </div>
                    <div className="ProfileMenu" style={{ 'display': ((showProfileSwitcherMenu) ? 'grid' : 'none') }}>
                        <ProfileSelectionMenu />
                    </div>
                </div>
            </div>

            <div className="control-group">
                <DisplayModeButton icon={faTh}      title="Compact"   value="compact"   />
                <DisplayModeButton icon={faThLarge} title="Condensed" value="condensed" />
                <DisplayModeButton icon={faSquare}  title="Standard"  value="standard"  />
            </div>

            <div className="control-group">
                <div className="control-button" onClick={props.handleScrollToTop} title="Scroll To Top"><FontAwesomeIcon size="lg" icon={faAngleUp} /></div>
            </div>

        </div>

    );

}

//
function DisplayModeButton(props) {

    //
    const [displayMode, setDisplayMode] = useRecoilState(displayModeState);

    //
    return (
        <button className={`control-button ${((displayMode === props.value) ? 'active' : '')}`} onClick={() => setDisplayMode(props.value)} title={`Change the display to a "${props.title}" mode`}><FontAwesomeIcon size="lg" icon={props.icon} /></button>
    );

}
