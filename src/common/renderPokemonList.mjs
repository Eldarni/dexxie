
//
import { getTags, getPokemon } from './store.mjs';

//
import { filterPokemonBySearchString } from './filterPokemonBySearchString.mjs';

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
    const results = document.querySelector('[data-name="pokemon-results"]');

    //
    if (!filteredPokemon || !Array.isArray(filteredPokemon) || filteredPokemon.length === 0) {
        results.innerHTML = '<p>No Pokémon found.</p>';
        return;
    }

    //
    results.innerText = '';

    //
    filteredPokemon.forEach(p => {

        //
        const wrapper = document.createElement('div');
        wrapper.className = 'pokemon';
        wrapper.dataset.id = p.id;

        //
        const number = document.createElement('div');
        number.className = 'number';
        number.innerHTML = `<span>#${'0'.repeat(4 - String(p.nationalDex).length)}</span>${p.nationalDex}`;

        //
        const name = document.createElement('div');
        name.className = 'name';
        name.textContent = p.name.en;

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
        results.append(wrapper);

    });

}