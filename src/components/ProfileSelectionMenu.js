
//
import React from 'react';

//
import { useApplicationState } from '../context/ApplicationContext';
import { useProfileState } from '../context/ProfileContext';

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

//
export default (props) => {

    //
    const applicationState = useApplicationState();
    const profileState     = useProfileState();

    //
    return (
        <React.Fragment>
                        
            {profileState.getAllProfiles().map(function(profile, i){
                return (
                    <div className="ProfileMenuCard" key={profile.id} onClick={()=>{applicationState.changeProfile(profile.id)}}>
                        <img src={profile.icon} alt={profile.name} title={profile.name} />
                        <span>{profile.name}</span>
                    </div>
                );
            })}

            <div className="ProfileMenuCard">
                <FontAwesomeIcon size="lg" icon={faPlus} />
                <span>New Profile</span>
            </div>

        </React.Fragment>
    );

}