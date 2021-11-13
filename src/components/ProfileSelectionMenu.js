
//
import React from 'react';
import { useSetRecoilState } from 'recoil';

//
import { currentProfileState } from '../store';

//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

//
export default (props) => {

    //
    const setCurrentProfile = useSetRecoilState(currentProfileState);

    //
    const profiles = [
        {'id': '567a7b8b-fb15-4130-be54-24c5c0be196e', 'icon': '/icons/001-bulbasaur.svg',  'name' : 'Pokemon Green' },
        {'id': '3bb76c9e-903d-47cf-a761-0ec1380711f7', 'icon': '/icons/004-charmander.svg', 'name' : 'Pokemon Red' },
        {'id': 'a636322c-eb67-47fd-bbcd-5f67edb89ccb', 'icon': '/icons/007-squirtle.svg',   'name' : 'Pokemon Blue' },
        {'id': '35aca8fc-e3c6-4606-ab1c-1c75640d3445', 'icon': '/icons/025-pikachu.svg',    'name' : 'Pokemon Yellow' },
    ];

    //
    return (
        <React.Fragment>
                        
            {profiles.map(function(profile, i){
                return (
                    <div className="ProfileMenuCard" key={profile.id} onClick={()=>{setCurrentProfile(profile.id)}} title={profile.name}>
                        <img src={profile.icon} alt={profile.name}  />
                    </div>
                );
            })}

            <div className="ProfileMenuCard" title="Add Profile">
                <FontAwesomeIcon size="lg" icon={faPlus} />
            </div>

        </React.Fragment>
    );

}