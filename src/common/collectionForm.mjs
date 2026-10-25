
//
import { createCollection, updateCollection, deleteCollection, changeCollection } from './store.mjs';

//
import { REGIONS, TYPES, OTHER, getTagLabel, getEmptyFilters } from './builtInTags.mjs';

//
import { createElement } from '../../utilities/createElement.mjs';

//
import { showPopup, hidePopup } from '../popup.mjs';

//show the form to make a new collection, or to edit the one given
export function showCollectionForm(collection = null) {
    showPopup((collection ? 'Edit collection' : 'New collection'), (body) => body.append(createCollectionForm(collection)));
}

//
function createCollectionForm(collection) {

    //
    const filters = { ...getEmptyFilters(), ...collection?.filters };

    //
    const form = createElement('form', { 'class': 'collection-form', 'novalidate': '' }, [
        ['label', {}, [
            ['span', {}, 'Name'],
            ['input', { 'type': 'text', 'name': 'name', 'autocomplete': 'off' }]
        ]],
        ['label', {}, [
            ['span', {}, 'Description'],
            ['input', { 'type': 'text', 'name': 'description', 'autocomplete': 'off' }]
        ]],
        createChipGroup('Region', 'regions', REGIONS, filters.regions),
        createChipGroup('Type', 'types', TYPES, filters.types),
        createChipGroup('Other', 'other', OTHER, filters.other),
        ['div', { 'class': 'collection-form-actions' }, [
            ...(collection ? [['button', { 'type': 'button', 'data-action': 'delete-collection' }, 'Delete']] : []),
            ['button', { 'type': 'button', 'data-action': 'cancel' }, 'Cancel'],
            ['button', { 'type': 'submit' }, 'Save']
        ]]
    ]);

    //set as properties, so any text is kept as it is
    const name = form.elements.namedItem('name');
    name.value = collection?.name || '';
    form.elements.namedItem('description').value = collection?.description || '';

    //
    name.addEventListener('input', () => name.setCustomValidity(''));

    //
    form.addEventListener('click', (event) => {

        //the chips are just on or off
        const chip = event.target.closest('[data-group]');
        if (chip) {
            chip.setAttribute('aria-pressed', String(chip.getAttribute('aria-pressed') !== 'true'));
            return;
        }

        //
        if (event.target.closest('[data-action="cancel"]')) {
            hidePopup();
            return;
        }

        //
        if (event.target.closest('[data-action="delete-collection"]')) {
            deleteCollection(collection.id);
            hidePopup();
        }

    });

    //
    form.addEventListener('submit', (event) => {

        //
        event.preventDefault();

        //
        if (name.value.trim() === '') {
            name.setCustomValidity('Give the collection a name');
            name.reportValidity();
            return;
        }

        //
        const data = {
            name: name.value.trim(),
            description: form.elements.namedItem('description').value.trim(),
            filters: getFormFilters(form)
        };

        //a new collection is switched to straight away, an edited one is already showing
        if (collection) {
            updateCollection(collection.id, data);
        } else {
            changeCollection(createCollection(data));
        }

        //
        hidePopup();

    });

    //
    return form;

}

//a group of chips that are on or off, one for each tag
function createChipGroup(title, group, tags, selected) {
    return createElement('fieldset', { 'class': 'chip-group' }, [
        ['legend', {}, title],
        ...tags.map(tag => ['button', { 'type': 'button', 'class': 'chip', 'data-group': group, 'data-tag': tag, 'aria-pressed': String(selected.includes(tag)) }, getTagLabel(tag)])
    ]);
}

//read the chips back into filters, in the order the chips are shown
function getFormFilters(form) {

    //
    const tagsOf = (selector) => Array.from(form.querySelectorAll(selector)).map(chip => chip.dataset.tag);

    //
    return {
        regions: tagsOf('[data-group="regions"][aria-pressed="true"]'),
        types: tagsOf('[data-group="types"][aria-pressed="true"]'),
        other: tagsOf('[data-group="other"][aria-pressed="true"]')
    };

}
