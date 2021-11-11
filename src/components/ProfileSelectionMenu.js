
//
import React from 'react';
import { useSetRecoilState } from 'recoil';

//
import { currentProfileState } from '../store';

//
import { useProfileState } from '../context/ProfileContext';

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

//
export default (props) => {

    //
    const setCurrentProfile = useSetRecoilState(currentProfileState);

    //
    const profileState     = useProfileState();

    //
    return (
        <React.Fragment>
                        
            {profileState.getAllProfiles().map(function(profile, i){
                return (
                    <div className="ProfileMenuCard" key={profile.id} onClick={()=>{setCurrentProfile(profile.id)}}>
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