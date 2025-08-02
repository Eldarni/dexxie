
//
import './style.scss';

//
import { toast } from '../utilities/toaster.mjs';

//
import { initializeAndMigrateStores, getCollections, getCurrentCollection, setCurrentCollection, togglePokemonTag } from './common/store.mjs';

//
import { subscribe, emit } from '../utilities/events.mjs';

//
import { exportPokemonData, importPokemonData } from './dataManager.mjs';
import { debounceLeading, debounceTrailing } from '../utilities/debounce.mjs';

//
import { renderPokemonList } from './common/renderPokemonList.mjs';

//
initializeAndMigrateStores();

//
subscribe('pokemon-list-updated', () => renderPokemonList());

//
const grid = document.querySelector('.grid');

//
let currentCollection = 'national';

//
let lastFilteredPokemon = [];

//
document.getElementById('search-bar').addEventListener('input', debounceTrailing(300, (event) => {
    renderPokemonList(event.target.value);
}));

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

        //
        const collection = e.target.dataset.collection;

        //
        setCurrentCollection(collection);

        //
        const collectionData = getCurrentCollection();

        // Update current collection
        dropdownText.textContent = collectionData?.name;

        // Update active state
        dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
            item.classList.remove('active');
        });
        e.target.classList.add('active');

        // Close dropdown
        dropdownToggle.classList.remove('active');
        dropdownMenu.classList.remove('show');

    }
});

// Function to populate dropdown with collections
function populateDropdown() {
    const collections = getCollections();
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
const collections = getCollections();
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

    //
    const tag = event.target.dataset.tag;

    //
    const isTagged = togglePokemonTag(name, tag);

    //
    event.target.setAttribute('data-state', (isTagged ? 1 : 0));

}));
