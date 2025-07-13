
//
import pokemonData from './pokemon.json';

//
import { getLocalStorageJSON, setLocalStorageJSON } from '../utilities/storage.mjs';
import { exportPokemonData, importPokemonData } from './dataManager.mjs';
import { debounceLeading, debounceTrailing } from '../utilities/debounce.mjs';
import { filterPokemonBySearchString } from './pokemonFilter.mjs';

//
const app = document.getElementById('app');

//
let lastFilteredPokemon = [];

//
document.getElementById('search-bar').addEventListener('input', debounceTrailing(300, (event) => {
    renderPokemonList(event.target.value);
}));

//
function renderPokemonList(searchString = null) {


    //
    const taggedPokemon = getLocalStorageJSON('pokemon', {});

    //
    const allPokemon = pokemonData.map((pokemon) => {
        if (taggedPokemon.hasOwnProperty(pokemon.name) && taggedPokemon[pokemon.name].length > 0) {
            return { ...pokemon, "tags" : [ ...pokemon.tags, ...taggedPokemon[pokemon.name]]}
        }
        return pokemon;
    });

    //time to make the search
    const filteredPokemon = filterPokemonBySearchString(allPokemon, searchString);

    //store the current selection so we can perform bulk actions on it
    lastFilteredPokemon = filteredPokemon;

    //
    if (!filteredPokemon || !Array.isArray(filteredPokemon) || filteredPokemon.length === 0) {
        app.innerHTML = '<p>No Pokémon found.</p>';
        return;
    }

    //
    const tags = getLocalStorageJSON('tags', ["owned", "shiny", "lucky", "nundo", "hundo", "shundo"]);

    //
    app.innerText = '';

    //
    filteredPokemon.forEach(p => {

        //
        const wrapper = document.createElement('div');
        wrapper.className = 'pokemon';
        wrapper.dataset.name = p.name;

        //
        const number = document.createElement('div');
        number.className = 'number';
        number.innerHTML = `<span>#${'0'.repeat(4 - String(p.nationalDex).length)}</span>${p.nationalDex}`;

        //
        const name = document.createElement('div');
        name.className = 'name';
        name.textContent = p.name;

        //
        const buttons = document.createElement('div');
        buttons.className = 'buttons';

        //
        wrapper.appendChild(number);
        wrapper.appendChild(name);
        wrapper.appendChild(buttons);

        //
        tags.forEach(tag => {

            //
            const button = document.createElement('button');

            //
            button.className = 'button'
            button.textContent = tag;

            //
            button.setAttribute('data-action', 'toggle-tag');
            button.setAttribute('data-tag', tag);
            button.setAttribute('data-state', ((p.tags.includes(tag)) ? 1 : 0));

            //
            buttons.appendChild(button);

        });

        //
        app.append(wrapper);

    });

}

//
renderPokemonList();

// Add event listeners for export and import buttons
document.querySelector('button[data-action="export-tags"').addEventListener('click', exportPokemonData);
document.querySelector('button[data-action="import-tags"').addEventListener('click', async () => {
    const didImport = await importPokemonData();
    if (didImport) {
        renderPokemonList();
    }
});

//
document.querySelector('button[data-action="copy-list"').addEventListener('click', () => {

    //
    if (!lastFilteredPokemon || lastFilteredPokemon.length === 0) {
        alert('No Pokémon to copy!');
        return;
    }

    // Copy names as a newline-separated list
    const text = lastFilteredPokemon.map(p => p.name).join(', ');
    navigator.clipboard.writeText(text).then(() => {
        alert('Pokémon list copied to clipboard!');
    });

});

//
app.addEventListener('click', debounceLeading(300, (event) => {

    //
    if (event.target.dataset.action != 'toggle-tag') {
        return;
    }

    //
    const name = event.target.closest('.pokemon').dataset.name;
    const tag = event.target.dataset.tag;

    //
    const pokemon = getLocalStorageJSON('pokemon', {});

    //
    if (!pokemon[name]) {
        pokemon[name] = [];
    }

    //
    if (pokemon[name].includes(tag)) {
        pokemon[name] = pokemon[name].filter(t => t !== tag);
    } else {
        pokemon[name].push(tag);
    }

    //
    if (pokemon[name].length === 0) {
        delete pokemon[name];
    }

    //
    setLocalStorageJSON('pokemon', pokemon);

    //
    event.target.setAttribute('data-state', ((pokemon[name]?.includes(tag)) ? 1 : 0));

}));
