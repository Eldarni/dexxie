
//
import React, { useState, useEffect } from 'react';

//
import pokemon from '../static/pokemon.json';

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

    //
    const [ currentProfileState ] = useApplicationState();

    //get the user applied tags for the current profile
    const profileTags = JSON.parse(window.localStorage.getItem('profile-' + currentProfileState)) || {};

    //merge the user's tags into the main list of pokemon
    const taggedPokemon = objectMap(pokemon, function(value) {
        if (value.id in profileTags) {
            return { ...value, 'tags' : [ ...value.tags, ...profileTags[value.id] ] };
        }
        return value;
    });

    //allow the visibility of the popups to be toggled
    const [showProfilesPopop, setShowProfilesPopop] = useState(false);
            
    //
    return (
        <ProfileProvider>
            <Header />
            <Content className={((showProfilesPopop || showTagsPopop) ? 'blurred' : '')}>
                <PokeDex pokemon={taggedPokemon} setShowProfilesPopop={setShowProfilesPopop} />
                <Popup title="Profiles" visible={showProfilesPopop} onClose={() => setShowProfilesPopop(false)}><ProfileManager /></Popup>
            </Content>
            <Footer />
        </ProfileProvider>
    );

};

//apply the supplied function to each property in the object and return a new object
function objectMap(object, mapFn) {
    return Object.keys(object).reduce(function(result, key) {
        result[key] = mapFn(object[key])
        return result
    }, {})
};