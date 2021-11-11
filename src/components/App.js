
//
import React from 'react';
import { RecoilRoot } from 'recoil';

//
import pokemon from '../static/pokemon.json';

//
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
    const profileState = useProfileState();

    //
    const currentProfile     = profileState.getCurrentProfile();
    const currentProfileTags = (currentProfile.tags || {});

    //merge the user's tags into the main list of pokemon
    const taggedPokemon = objectMap(pokemon, function(value) {
        if (value.id in currentProfileTags) {
            return { ...value, 'tags' : [ ...value.tags, ...currentProfileTags[value.id] ] };
        }
        return value;
    });

    //now filter the pokemon based on the profiles "filter" string
    const filteredPokemon = ((currentProfile.filter !== '') ? pokemonSearch(taggedPokemon, currentProfile.filter) : taggedPokemon);

    //
    const [showWelcomePopop, setShowWelcomePopop]   = React.useState(!(process.env.NODE_ENV === 'development'));

    //allow the visibility of the popups to be toggled
    const [showProfilesPopop, setShowProfilesPopop] = React.useState(false);
    const [showTagsPopop,     setShowTagsPopop]     = React.useState(false);

    //
    return (
        <RecoilRoot>
            <Layout className={((showWelcomePopop || showProfilesPopop || showTagsPopop) ? 'blurred' : '')}>
                <PokeDex pokemon={filteredPokemon} setShowProfilesPopop={setShowProfilesPopop} setShowTagsPopop={setShowTagsPopop} />
                <Popup title="Welcome"  visible={showWelcomePopop}  onClose={() => setShowWelcomePopop(false)}><WelcomePopup /></Popup>
                <Popup title="Profiles" visible={showProfilesPopop} onClose={() => setShowProfilesPopop(false)}><ProfileManager /></Popup>
                <Popup title="Tags"     visible={showTagsPopop}     onClose={() => setShowTagsPopop(false)}><TagManager /></Popup>
            </Layout>
        </RecoilRoot>
    );

};

//apply the supplied function to each property in the object and return a new object
function objectMap(object, mapFn) {
    return Object.keys(object).reduce(function(result, key) {
        result[key] = mapFn(object[key])
        return result
    }, {})
};