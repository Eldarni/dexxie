
//
import React from 'react';

//
import pokemon from '../static/pokemon.json';

//
import { useApplicationState }  from '../context/ApplicationContext';
import { useProfileState } from '../context/ProfileContext';

//
import Layout  from './Layout';
import PokeDex from './PokeDex';

//
import pokemonSearch from '../utils/pokemonSearch';

//
import Popup from './Popup';

//
import WelcomePopup from './WelcomePopup';

//
import ProfileManager from './ProfileManager';
import TagManager from './TagManager';

//
export default () => {

    //
    const applicationState = useApplicationState();

    //get the user applied tags for the current profile
    const userTags = JSON.parse(window.localStorage.getItem('profile-' + applicationState.getCurrentProfileID())) || {};

    //merge the user's tags into the main list of pokemon
    const taggedPokemon = objectMap(pokemon, function(value) {
        if (value.id in userTags) {
            return { ...value, 'tags' : [ ...value.tags, ...userTags[value.id] ] };
        }
        return value;
    });

    //now apply the current profile filter
    const profiles = useProfileState();
    const currentProfile = profiles.getCurrentProfile();

    const filteredPokemon = ((currentProfile.filter !== '') ? pokemonSearch(taggedPokemon, currentProfile.filter) : taggedPokemon);

    //
    const [showWelcomePopop, setShowWelcomePopop]   = React.useState(true);

    //allow the visibility of the popups to be toggled
    const [showProfilesPopop, setShowProfilesPopop] = React.useState(false);
    const [showTagsPopop,     setShowTagsPopop]     = React.useState(false);

    //
    return (
        <Layout className={((showWelcomePopop || showProfilesPopop || showTagsPopop) ? 'blurred' : '')}>
            <PokeDex pokemon={filteredPokemon} setShowProfilesPopop={setShowProfilesPopop} setShowTagsPopop={setShowTagsPopop} />
            <Popup title="Welcome"  visible={showWelcomePopop}  onClose={() => setShowWelcomePopop(false)}><WelcomePopup /></Popup>
            <Popup title="Profiles" visible={showProfilesPopop} onClose={() => setShowProfilesPopop(false)}><ProfileManager /></Popup>
            <Popup title="Tags"     visible={showTagsPopop}     onClose={() => setShowTagsPopop(false)}><TagManager /></Popup>
        </Layout>
    );

};

//apply the supplied function to each property in the object and return a new object
function objectMap(object, mapFn) {
    return Object.keys(object).reduce(function(result, key) {
        result[key] = mapFn(object[key])
        return result
    }, {})
};