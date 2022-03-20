
//
import React from 'react';
import { useRecoilValue } from 'recoil';

//
import pokemon from '../static/pokemon.json';

//
import { currentProfileDataState } from '../store';

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
    const currentProfile = useRecoilValue(currentProfileDataState);
    const currentProfileTags = (currentProfile.tags || {});

    //merge the user's tags into the main list of pokemon
    const taggedPokemon = objectMap(pokemon, function(value, key) {
        return { ...value, 'tags' : [ ...((key in currentProfileTags) ? currentProfileTags[key] : []) ] };
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
        result[key] = mapFn(object[key], key)
        return result
    }, {})
};