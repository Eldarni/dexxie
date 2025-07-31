
//
import { getTags, getPokemon } from './store.mjs';

//
import { filterPokemonBySearchString } from './pokemonFilter.mjs';

//
export function renderPokemonList(searchString = null) {

    // Filter by collection first
    let collectionFilteredPokemon = getPokemon();

    //time to make the search
    const filteredPokemon = filterPokemonBySearchString(collectionFilteredPokemon, searchString);

    //store the current selection so we can perform bulk actions on it
    // lastFilteredPokemon = filteredPokemon;

    //
    const tags = getTags();

    //
    const grid = document.querySelector('.grid');

    //
    if (!filteredPokemon || !Array.isArray(filteredPokemon) || filteredPokemon.length === 0) {
        grid.innerHTML = '<p>No Pokémon found.</p>';
        return;
    }

    //
    grid.innerText = '';

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
        grid.append(wrapper);

    });

}