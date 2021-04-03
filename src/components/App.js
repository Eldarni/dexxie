
//
import React, { useState, useEffect } from 'react';

//
import pokemon from '../static/pokemon.json';

//
import { useApplicationState }  from '../context/ApplicationContext';

//
import { ProfileProvider }  from '../context/ProfileContext';
import { TagProvider }  from '../context/TagContext';

//
import Header  from './Header';
import Content from './Content';
import Footer  from './Footer';

//
import PokeDex from './PokeDex';

//
import Popup from './Popup';
import ProfileManager from './ProfileManager';
import TagManager from './TagManager';

//
export default () => {

    //
    const [ currentProfileState ] = useApplicationState();

    //get the user applied tags for the current profile
    const userTags = JSON.parse(window.localStorage.getItem('profile-' + currentProfileState)) || {};

    //merge the user's tags into the main list of pokemon
    const taggedPokemon = objectMap(pokemon, function(value) {
        if (value.id in userTags) {
            return { ...value, 'tags' : [ ...value.tags, ...userTags[value.id] ] };
        }
        return value;
    });

    //allow the visibility of the popups to be toggled
    const [showProfilesPopop, setShowProfilesPopop] = useState(false);
    const [showTagsPopop,     setShowTagsPopop]     = useState(false);

    //
    return (
        <ProfileProvider>
            <TagProvider>
                <Header />
                <Content className={((showProfilesPopop || showTagsPopop) ? 'blurred' : '')}>
                    <PokeDex pokemon={taggedPokemon} setShowProfilesPopop={setShowProfilesPopop} setShowTagsPopop={setShowTagsPopop} />
                    <Popup title="Profiles" visible={showProfilesPopop} onClose={() => setShowProfilesPopop(false)}><ProfileManager /></Popup>
                    <Popup title="Tags"     visible={showTagsPopop}     onClose={() => setShowTagsPopop(false)}><TagManager /></Popup>
                </Content>
                <Footer />
            </TagProvider>
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