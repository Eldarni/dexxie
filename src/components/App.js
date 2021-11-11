
//
import React from 'react';

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

    //
    return (
        <Layout className={((showWelcomePopop) ? 'blurred' : '')}>
            <PokeDex pokemon={filteredPokemon} />
            <Popup title="Welcome"  visible={showWelcomePopop}  onClose={() => setShowWelcomePopop(false)}><WelcomePopup /></Popup>
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