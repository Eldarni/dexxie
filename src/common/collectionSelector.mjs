
//
import { getCollections, getCollection, changeCollection } from './store.mjs';

//
import { subscribe, emit } from '../../utilities/events.mjs';

//
import { createElement } from '../../utilities/createElement.mjs';

//
const dropdown = document.querySelector('[data-name="collections-selector"]');

//
const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
const dropdownMenu = dropdown.querySelector('.dropdown-menu');

//
export function initialiseCollectionSelector() {

    //
    subscribe('collection-changed', populateCollectionsDropdown);

    //
    subscribe('collection-created', populateCollectionsDropdown);
    subscribe('collection-deleted', populateCollectionsDropdown);

    //
    populateCollectionsDropdown();

    //
    dropdownToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdown.classList.toggle('active');
    });

    //
    document.addEventListener('click', (event) => {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });

    //
    dropdownMenu.addEventListener('click', (event) => {

        //
        if (!event.target.classList.contains('dropdown-item')) {
            return;
        }

        //
        const collection = event.target.dataset.collection;

        //
        changeCollection(collection);

        //
        setTimeout(() => {
            dropdown.classList.remove('active');
        }, 100);

    });

}

//
function populateCollectionsDropdown() {

    //
    const collections = getCollections();

    //
    const currentCollection = getCollection();

    //
    dropdownToggle.textContent = currentCollection.name;

    //
    dropdownMenu.innerHTML = '';

    //
    Object.entries(collections).forEach(([id, collection]) => {
        dropdownMenu.appendChild(createElement('div', {
            'class': `dropdown-item${id === currentCollection.id ? ' active' : ''}`,
            'data-collection': id,
            'title': collection.description
        }, collection.name));
    });

}