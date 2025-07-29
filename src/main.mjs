
//
import './style.scss';

//
import pokemonData from './pokemon.json';

//
import { toast } from '../utilities/toaster.mjs';

//
import { getLocalStorageJSON, setLocalStorageJSON } from '../utilities/storage.mjs';
import { exportPokemonData, importPokemonData } from './dataManager.mjs';
import { debounceLeading, debounceTrailing } from '../utilities/debounce.mjs';
import { filterPokemonBySearchString } from './pokemonFilter.mjs';

//
const grid = document.querySelector('.grid');

//
let currentCollection = 'national';

//
let lastFilteredPokemon = [];

// Initialize default collections if they don't exist
function initializeCollections() {
    const collections = getLocalStorageJSON('collections', {
        'national': {
            name: 'National Dex',
            description: 'All Pokémon in the National Pokédex',
            searchString: ''
        },
        'kanto': {
            name: 'Kanto (Red/Blue)',
            description: 'Original 151 Pokémon from Kanto region',
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
        'starters': {
            name: 'Starters',
            description: 'All starter Pokémon from every generation',
            searchString: 'bulbasaur or charmander or squirtle or chikorita or cyndaquil or totodile or treecko or torchic or mudkip or turtwig or chimchar or piplup'
        },
        'legendaries': {
            name: 'Legendaries',
            description: 'Legendary or mythical Pokémon',
            searchString: 'mewtwo or mew or lugia or ho-oh or celebi or kyogre or groudon or rayquaza or dialga or palkia or arceus or reshiram or zekrom or kyurem or xerneas or yveltal or zacian or zamazenta or koraidon or miraidon'
        },
        'favorites': {
            name: 'My Favorites',
            description: 'Your favorite Pokémon (customizable)',
            searchString: 'pikachu or charizard or lucario'
        }
    });
    return collections;
}

//
initializeCollections();

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

    // Filter by collection first
    let collectionFilteredPokemon = allPokemon;

            //
            const collections = getLocalStorageJSON('collections', {});
            const currentCollectionData = collections[currentCollection];

            if (currentCollectionData && currentCollectionData.searchString) {
                const searchString = currentCollectionData.searchString.toLowerCase();
                collectionFilteredPokemon = filterPokemonBySearchString(collectionFilteredPokemon, searchString);
            }

    //time to make the search
    const filteredPokemon = filterPokemonBySearchString(collectionFilteredPokemon, searchString);

    //store the current selection so we can perform bulk actions on it
    lastFilteredPokemon = filteredPokemon;

    //
    if (!filteredPokemon || !Array.isArray(filteredPokemon) || filteredPokemon.length === 0) {
        grid.innerHTML = '<p>No Pokémon found.</p>';
        return;
    }

    //
    const tags = getLocalStorageJSON('tags', ["owned", "shiny", "lucky", "nundo", "hundo", "shundo"]);

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

//
renderPokemonList();

// Handle export and import buttons
document.querySelector('button[data-action="export-tags"').addEventListener('click', exportPokemonData);
document.querySelector('button[data-action="import-tags"').addEventListener('click', async () => {
    const didImport = await importPokemonData();
    if (didImport) {
        renderPokemonList();
    }
});

// Handle copy list button
document.querySelector('button[data-action="copy-list"').addEventListener('click', () => {

    //
    if (!lastFilteredPokemon || lastFilteredPokemon.length === 0) {
        return;
    }

    // Copy names as a newline-separated list
    const text = lastFilteredPokemon.map(p => p.name).join(', ');
    navigator.clipboard.writeText(text).then(() => {
        toast(`Copied!`, 'success', 3000);
    });

});

// Dropdown functionality
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownText = document.querySelector('.dropdown-text');

// Toggle dropdown
dropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownToggle.classList.toggle('active');
    dropdownMenu.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownToggle.classList.remove('active');
        dropdownMenu.classList.remove('show');
    }
});

// Handle collection selection
dropdownMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('dropdown-item')) {
        const collection = e.target.dataset.collection;
        const collections = getLocalStorageJSON('collections', {});
        const collectionData = collections[collection];

        if (collectionData) {
            // Update current collection
            currentCollection = collection;
            dropdownText.textContent = collectionData.name;

            // Update active state
            dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
                item.classList.remove('active');
            });
            e.target.classList.add('active');

            // Close dropdown
            dropdownToggle.classList.remove('active');
            dropdownMenu.classList.remove('show');

            // Re-render the list with new collection
            renderPokemonList();
        }
    }
});

// Function to populate dropdown with collections
function populateDropdown() {
    const collections = getLocalStorageJSON('collections', {});
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Clear existing items
    dropdownMenu.innerHTML = '';

    // Add collection items
    Object.entries(collections).forEach(([key, collection]) => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.dataset.collection = key;
        item.textContent = collection.name;
        item.title = collection.description;
        dropdownMenu.appendChild(item);
    });
}


// Initialize collections and populate dropdown
const collections = initializeCollections();
populateDropdown();

// Set initial dropdown text
const initialCollection = collections[currentCollection];
if (initialCollection) {
    dropdownText.textContent = initialCollection.name;
}

// Set initial active state
const initialActiveItem = dropdownMenu.querySelector(`[data-collection="${currentCollection}"]`);
if (initialActiveItem) {
    initialActiveItem.classList.add('active');
}

//
grid.addEventListener('click', debounceLeading(300, (event) => {

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
