
//
import React, { useState, useEffect } from 'react';

//
import pokemonList from '../static/pokemon.json';

//
import usePersistedState from '../hooks/usePersistedState';

//
import Header  from './Header';
import Content from './Content';
import Footer  from './Footer';

//
import Popup from './Popup';

//
import concatUnique from '../utils/concatUnique';

//
import PokeDex from './PokeDex';
import ProfileManager from './ProfileManager';

//
import { ProfileProvider }  from '../context/ProfileContext';
//
export default () => {

    //what profile are we using
    const [currentProfile, setCurrentProfile] = usePersistedState('current-profile', 'ad75aad9-5373-4581-b8e1-5819aaef283a');

    //load the user data that's been save for the current profile
    const [userData, setUserData] = usePersistedState('profile-' + currentProfile, {});

    //merge the contents of the user's personal tags into the main tag list
    Object.keys(userData).forEach(function(pokemon) {
        if (pokemon in pokemonList) {
            pokemonList[pokemon]['tags'] = concatUnique(pokemonList[pokemon]['tags'], userData[pokemon]);
        }
    });

    //allow the visibility of the popups to be toggled
    const [showProfilesPopop, setShowProfilesPopop] = useState(false);
            
    //
    return (
        <ProfileProvider>
            <Header />
            <Content className={((showProfilesPopop || showTagsPopop) ? 'blurred' : '')}>
                <PokeDex pokemon={pokemonList} />
                <Popup title="Profiles" visible={showProfilesPopop} onClose={() => setShowProfilesPopop(false)}><ProfileManager /></Popup>
            </Content>
            <Footer />
        </ProfileProvider>
    );

};