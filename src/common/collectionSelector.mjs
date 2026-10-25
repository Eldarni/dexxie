
//
import { getCollections, getCollection, changeCollection, isEditableCollection } from './store.mjs';

//
import { showCollectionForm } from './collectionForm.mjs';

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
    subscribe('collection-updated', populateCollectionsDropdown);
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
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            dropdown.classList.remove('active');
        }
    });

    //
    dropdownMenu.addEventListener('click', (event) => {

        //
        const item = event.target.closest('.dropdown-item');
        if (!item) {
            return;
        }

        //
        if (item.dataset.action === 'new-collection') {
            showCollectionForm();
        } else if (item.dataset.action === 'edit-collection') {
            showCollectionForm(getCollection());
        } else {
            changeCollection(item.dataset.collection);
        }

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

    //
    dropdownMenu.appendChild(createElement('div', { 'class': 'dropdown-item dropdown-action', 'data-action': 'new-collection' }, [
        ['i', { 'class': 'fa-solid fa-plus' }],
        ['span', {}, 'New collection…']
    ]));

    //the national dex can't be edited
    if (isEditableCollection(currentCollection.id)) {
        dropdownMenu.appendChild(createElement('div', { 'class': 'dropdown-item dropdown-action', 'data-action': 'edit-collection' }, [
            ['i', { 'class': 'fa-solid fa-pen' }],
            ['span', {}, 'Edit this collection…']
        ]));
    }

}