
//
import { getPokemon } from './store.mjs';

//
import { isSelected } from './selection.mjs';

//
import { emit } from '../../utilities/events.mjs';

//
import { filterPokemonBySearchString } from './filterPokemonBySearchString.mjs';

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

        //
        const number = document.createElement('div');
        number.className = 'number';
        number.innerHTML = `<span>#${'0'.repeat(4 - String(p.number).length)}</span>${p.number}`;

        //
        const checkbox = document.createElement('button');
        checkbox.type = 'button';
        checkbox.className = 'checkbox';
        checkbox.setAttribute('data-action', 'toggle-selection');
        checkbox.setAttribute('aria-label', `Select ${p.name.en}`);

        //space for the icon (up to 128x128), a placeholder for now
        const icon = document.createElement('div');
        icon.className = 'icon';

        //
        const name = document.createElement('div');
        name.className = 'name';
        name.textContent = p.name.en;

        //
        const menuToggle = document.createElement('button');
        menuToggle.type = 'button';
        menuToggle.className = 'tag-menu-toggle';
        menuToggle.setAttribute('data-action', 'open-tag-menu');
        menuToggle.setAttribute('aria-label', `Tags for ${p.name.en}`);

        //
        card.append(number, checkbox, icon, name, menuToggle);

        //
        results.append(card);

    });

    //
    emit('pokemon-list-rendered');

}

//
export function getPokemonCounts() {
    return { ...counts };
}

//the ids of the cards currently on screen, in display order
export function getVisiblePokemonIds() {
    return Array.from(document.querySelectorAll('[data-name="pokemon-results"] .pokemon')).map(card => card.dataset.id);
}