//
import { getLocalStorageJSON, setLocalStorageJSON } from '../../utilities/storage.mjs';

//
import { emit } from '../../utilities/events.mjs';

//
import { filterPokemonBySearchString } from './filterPokemonBySearchString.mjs';

//
import pokemonData from '../pokemon.json';

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
export function getCollection(collection = currentCollection) {

    //
    const collections = getCollections();

    //
    if (!collections.hasOwnProperty(collection)) {
        return null;
    }

    //
    return { id: collection, ...collections[collection] };

}

//
export function changeCollection(collection) {

    //
    currentCollection = collection || collection.id;

    //
    emit('collection-changed');

    //
    emit('pokemon-list-updated', currentCollection);

}

//
export function getTags() {

    //
    const collectionTags = getLocalStorageJSON(`${currentCollection}:tags`, null);
    if (Array.isArray(collectionTags) && collectionTags.length > 0) {
        return collectionTags;
    }

    //
    return defaultTags;

}

//
export function setTags(tags) {

    //
    setLocalStorageJSON(`${currentCollection}:tags`, tags || []);

    //
    emit('tags-updated', currentCollection);

    //
    emit('pokemon-list-updated', currentCollection);

}

//get the user tags for every pokemon in the current collection, keyed by id
export function getTaggedPokemon() {
    return getLocalStorageJSON(`${currentCollection}:pokemon`, {});
}

//add (or remove) a tag on several pokemon with a single write
export function setPokemonTag(ids, tag, enabled) {

    //
    const pokemon = getLocalStorageJSON(`${currentCollection}:pokemon`, {});

    //
    ids.forEach(id => {

        //
        const tags = (pokemon[id] || []).filter(t => t !== tag);

        //
        if (enabled) {
            tags.push(tag);
        }

        //
        if (tags.length === 0) {
            delete pokemon[id];
        } else {
            pokemon[id] = tags;
        }

    });

    //
    setLocalStorageJSON(`${currentCollection}:pokemon`, pokemon);

}

//
export function getPokemon() {

    //
    const taggedPokemon = getLocalStorageJSON(`${currentCollection}:pokemon`, {});

    //
    const pokemon = pokemonData.map((pokemon) => {
        if (taggedPokemon.hasOwnProperty(pokemon.id) && taggedPokemon[pokemon.id].length > 0) {
            return { ...pokemon, "tags" : [ ...pokemon.tags, ...taggedPokemon[pokemon.id]]}
        }
        return pokemon;
    });

    //
    const { searchString } = getCollection();

    //
    return filterPokemonBySearchString(pokemon, searchString);

}
