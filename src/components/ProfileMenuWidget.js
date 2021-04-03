
//
import React from 'react';

//
import Scrollable from "react-scrollbars-custom";

//
import { useProfileState } from '../context/ProfileContext';

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

//
import DropdownMenu from './DropdownMenu';

//
import { useApplicationState, useApplicationDispatch }  from '../context/ApplicationContext';

//
export default (props) => {

    //
    const [ currentProfileState ] = useApplicationState();
    const currentProfileDispatch  = useApplicationDispatch();

    //
    const profiles = useProfileState();

    //
    const changeProfile = (profile) => {
        currentProfileDispatch({'type': 'set-current-profile', 'currentProfile' : profile.id  });
    }

    //
    return (
        <div className="ProfileMenuWidget">
            <DropdownMenu label="Profiles">
                
                <div className="profiles-wrapper" style={{height:'500px'}}>
                    <Scrollable>
                        <div className="profiles-inner">
                            {profiles.map((profile) => <ProfileMenuItem key={profile.id} profile={profile} currentProfile={currentProfileState} onClick={()=>{changeProfile(profile)}} />)}
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
