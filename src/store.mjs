//
import { getLocalStorageJSON, setLocalStorageJSON } from '../utilities/storage.mjs';

//
import { emit } from '../utilities/events.mjs';

//
import { filterPokemonBySearchString } from './pokemonFilter.mjs';

//
import pokemonData from './pokemon.json';

//
let currentCollection = 'national';

//
const defaultCollections = {
    'national': {
        name: 'National Dex',
        description: 'All Pokémon in the National Pokédex',
        searchString: ''
    },
    'kanto': {
        name: 'Kanto (Red/Blue/Yellow/Green)',
        description: 'The original 151 Pokémon from Kanto region',
        searchString: 'kanto'
    },
    'johto': {
        name: 'Johto (Gold/Silver)',
        description: 'Pokémon from the Johto region',
        searchString: 'johto'
    },
    'hoenn': {
        name: 'Hoenn (Ruby/Sapphire)',
        description: 'Pokémon from the Hoenn region',
        searchString: 'hoenn'
    },
    'sinnoh': {
        name: 'Sinnoh (Diamond/Pearl)',
        description: 'Pokémon from the Sinnoh region',
        searchString: 'sinnoh'
    },
    'paldea': {
        name: 'Paldea (Scarlet/Violet)',
        description: 'Pokémon from the Paldea region',
        searchString: 'paldea'
    },
};

//
const defaultTags = [ "caught", "shiny", "lucky", "nundo", "hundo", "shundo" ];

//
export function initializeAndMigrateStores() {

    //
    if (localStorage.getItem('tags') === null) {
        setLocalStorageJSON('tags', defaultTags);
    }

    //
    if (localStorage.getItem('collections') === null) {
        setLocalStorageJSON('collections', defaultCollections);
    }

}

//
export function getCollections() {
    return getLocalStorageJSON('collections', {});
}


//
export function setCurrentCollection(collection) {
    currentCollection = collection;
    emit('pokemon-list-updated', currentCollection);
}

//
export function getCurrentCollection() {
    return getCollections()[currentCollection];
}

//
export function getTags() {
    return getLocalStorageJSON('tags', []);
}

//
export function getPokemon() {

    //
    const taggedPokemon = getLocalStorageJSON('pokemon', {});

    //
    const pokemon = pokemonData.map((pokemon) => {
        if (taggedPokemon.hasOwnProperty(pokemon.name) && taggedPokemon[pokemon.name].length > 0) {
            return { ...pokemon, "tags" : [ ...pokemon.tags, ...taggedPokemon[pokemon.name]]}
        }
        return pokemon;
    });

    //
    const currentCollectionData = getCurrentCollection();

    //
    return filterPokemonBySearchString(pokemon, currentCollectionData?.searchString);

}
