
//
import React from 'react';

//
import Scrollable from "react-scrollbars-custom";

//
import { useApplicationState }  from '../context/ApplicationContext';
import { useProfileState } from '../context/ProfileContext';

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

//
import DropdownMenu from './DropdownMenu';

//
export default (props) => {

    //
    const applicationState = useApplicationState();
    const profileState     = useProfileState();

    //
    const currentProfile = profileState.getCurrentProfile()
    
    //
    const changeProfile = (profile) => {
        applicationState.setCurrentProfileID(profile.id);
    }

    //
    return (
        <div className="ProfileMenuWidget">
            <DropdownMenu label="Profiles">
                
                <div className="profiles-wrapper" style={{height:'500px'}}>
                    <Scrollable>
                        <div className="profiles-inner">
                            {profileState.getAllProfiles().map((profile) => <ProfileMenuItem key={profile.id} profile={profile} currentProfile={currentProfile} onClick={()=>{changeProfile(profile)}} />)}
                        </div>
                    </Scrollable>
                </div>

                <div className="profile-menu-footer" onClick={() => {props.setShowProfilesPopop(true); }}>
                    Edit Profiles
                </div>

            </DropdownMenu>
        </div>
    );

}

//
const ProfileMenuItem = (props) => {
    if (props.profile.id === props.currentProfile) {
        return (<div className="menu-item" onClick={props.onClick}>{props.profile.name}<FontAwesomeIcon size="lg" icon={faCheck} /></div>);
    }
    return (<div className="menu-item" onClick={props.onClick}>{props.profile.name}</div>);
};
