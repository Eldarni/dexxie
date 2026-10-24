
//
import { getPokemon, getTags, getTaggedPokemon } from './store.mjs';

//
import { isSelected } from './selection.mjs';

//
import { emit } from '../../utilities/events.mjs';

//
import { filterPokemonBySearchString } from './filterPokemonBySearchString.mjs';

//
import pokemonData from '../pokemon.json';

//the pokemon types, to pick them out from the other tags
const TYPES = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];

//the built in tags of each pokemon, so a card's tags can be rebuilt when the user tags change
const builtInTags = new Map(pokemonData.map(p => [ p.id, p.tags ]));

//the number of pokemon in the collection, and how many of those the search is showing
const counts = { total: 0, visible: 0 };

//
export function renderPokemonList(searchString = null) {

    // Filter by collection first
    let collectionFilteredPokemon = getPokemon();

    //time to make the search
    const filteredPokemon = filterPokemonBySearchString(collectionFilteredPokemon, searchString);

    //store the current selection so we can perform bulk actions on it
    // lastFilteredPokemon = filteredPokemon;

    //
    const results = document.querySelector('[data-name="pokemon-results"]');

    //
    counts.total   = ((Array.isArray(collectionFilteredPokemon)) ? collectionFilteredPokemon.length : 0);
    counts.visible = ((Array.isArray(filteredPokemon))           ? filteredPokemon.length           : 0);

    //
    if (!filteredPokemon || !Array.isArray(filteredPokemon) || filteredPokemon.length === 0) {
        results.innerHTML = '<p>No Pokémon found.</p>';
        emit('pokemon-list-rendered');
        return;
    }

    //
    results.innerText = '';

    //
    filteredPokemon.forEach(p => {

        //
        const card = document.createElement('div');
        card.className = 'pokemon';
        card.dataset.id = p.id;
        card.classList.toggle('selected', isSelected(p.id));

        //the types are kept apart from the other tags, as the order matters for the background
        const [ type1, type2 ] = p.tags.filter(tag => TYPES.includes(tag));
        card.setAttribute('data-type-1', type1);
        if (type2) {
            card.setAttribute('data-type-2', type2);
        }

        //
        const number = document.createElement('div');
        number.className = 'number';
        number.innerHTML = `<span>#${'0'.repeat(4 - String(p.number).length)}</span>${p.number}`;

        //space for the icon (up to 128x128), the placeholder shows until the sprite has loaded
        const icon = document.createElement('div');
        icon.className = 'icon';

        //
        const sprite = document.createElement('img');
        sprite.loading = 'lazy';
        sprite.decoding = 'async';
        sprite.width = 128;
        sprite.height = 128;
        sprite.alt = p.name.en;
        sprite.draggable = false;
        sprite.addEventListener('load', () => icon.classList.add('loaded'));

        //
        icon.append(sprite);

        //
        const name = document.createElement('div');
        name.className = 'name';
        name.textContent = p.name.en;

        //
        card.append(number, icon, name);

        //
        updateCardTags(card, p.tags);

        //
        results.append(card);

    });

    //
    emit('pokemon-list-rendered');

}

//keep a card's tags in step with its user tags, then point its sprite at the normal or shiny image, and grey it out if it hasn't been caught
export function updateCardTags(card, tags) {

    //every tag, built in and the user's, for styling cards by tag in css
    card.dataset.tags = [ ...new Set([ ...builtInTags.get(card.dataset.id), ...tags ]) ].join(' ');

    //
    const icon = card.querySelector('.icon');
    const sprite = icon.querySelector('img');

    //
    const src = `${import.meta.env.BASE_URL}sprites/${(tags.includes('shiny') ? 'shiny/' : '')}${card.dataset.id}.webp`;

    //only swap the image when it changes, the placeholder shows again while the new one loads
    if (sprite.getAttribute('src') !== src) {
        icon.classList.remove('loaded');
        sprite.setAttribute('src', src);
    }

    //
    icon.classList.toggle('uncaught', !tags.includes('caught'));

}

//refresh the tags and sprites of the cards on screen after their tags have changed
export function updateAllCardTags() {

    //
    const taggedPokemon = getTaggedPokemon();

    //
    document.querySelectorAll('[data-name="pokemon-results"] .pokemon').forEach(card => {
        updateCardTags(card, (taggedPokemon[card.dataset.id] || []));
    });

}

//
export function getPokemonCounts() {
    return { ...counts };
}

//the ids of the cards currently on screen, in display order
export function getVisiblePokemonIds() {
    return Array.from(document.querySelectorAll('[data-name="pokemon-results"] .pokemon')).map(card => card.dataset.id);
}
