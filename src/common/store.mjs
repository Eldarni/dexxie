//
import { getLocalStorageJSON, setLocalStorageJSON } from '../../utilities/storage.mjs';

//
import { emit } from '../../utilities/events.mjs';

//
import { filterPokemonBySearchString } from './filterPokemonBySearchString.mjs';

//
import { buildSearchString } from './builtInTags.mjs';

//
import pokemonData from '../pokemon.json';

//the collection last picked, so a reload opens it again (checked once the stores are set up)
let currentCollection = getLocalStorageJSON('current-collection', 'national');

//
const defaultCollections = {
    ['national']: {
        name: 'National Dex',
        description: 'All Pokémon in the National Pokédex',
        searchString: ''
    },
};


//the tags a new collection starts with
const newCollectionTags = [ "caught", "shiny" ];

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

    //the last picked collection may have been deleted since
    if (getCollection() === null) {
        currentCollection = 'national';
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
    setLocalStorageJSON('current-collection', currentCollection);

    //
    emit('collection-changed');

    //
    emit('pokemon-list-updated', currentCollection);

}

//add a collection, with its search string built from its filters, returns the new id
export function createCollection({ name, description, filters }) {

    //the id keys the collection's stored tags, so it never changes, even on a rename
    const id = crypto.randomUUID();

    //
    const collections = getCollections();
    collections[id] = { name, description, filters, searchString: buildSearchString(filters) };
    setLocalStorageJSON('collections', collections);

    //
    setLocalStorageJSON(`${id}:tags`, newCollectionTags);

    //
    emit('collection-created', id);

    //
    return id;

}

//change a collection's name, description and filters, its tagged pokemon are kept even if they no longer match
export function updateCollection(id, { name, description, filters }) {

    //
    const collections = getCollections();
    if (id === 'national' || !collections.hasOwnProperty(id)) {
        return;
    }

    //
    collections[id] = { ...collections[id], name, description, filters, searchString: buildSearchString(filters) };
    setLocalStorageJSON('collections', collections);

    //
    emit('collection-updated', id);

    //the search may have changed, so the cards need rebuilding
    if (id === currentCollection) {
        emit('pokemon-list-updated', id);
    }

}

//remove a collection along with its tags and tagged pokemon, if it's the one showing the national dex is shown instead
export function deleteCollection(id) {

    //
    const collections = getCollections();
    if (id === 'national' || !collections.hasOwnProperty(id)) {
        return;
    }

    //
    delete collections[id];
    setLocalStorageJSON('collections', collections);

    //
    localStorage.removeItem(`${id}:pokemon`);
    localStorage.removeItem(`${id}:tags`);

    //
    if (id === currentCollection) {
        changeCollection('national');
    }

    //
    emit('collection-deleted', id);

}

//
export function isEditableCollection(id) {
    return (id !== 'national');
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
