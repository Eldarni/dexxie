
//
import './style.scss';

//
import { toast } from '../utilities/toaster.mjs';

//
import { initializeAndMigrateStores } from './common/store.mjs';

//
import { getSelection, isSelected, toggleSelection, selectOnly, selectRange, selectAll, clearSelection } from './common/selection.mjs';

//
import { initialiseCollectionSelector } from './common/collectionSelector.mjs';

//
import { subscribe } from '../utilities/events.mjs';

//
import { exportPokemonData } from './common/exportPokemonData.mjs';
import { importPokemonData } from './common/importPokemonData.mjs';

import { debounceTrailing } from '../utilities/debounce.mjs';

//
import { renderPokemonList, getVisiblePokemonIds } from './common/renderPokemonList.mjs';

//
import { initialiseTagMenu, toggleTagMenu } from './common/tagMenu.mjs';
import { initialiseSelectionBar } from './common/selectionBar.mjs';

//
import { showPopup } from './popup.mjs';

//
initializeAndMigrateStores();

//
initialiseCollectionSelector();

//
initialiseTagMenu();
initialiseSelectionBar();

//
renderPokemonList();

//
subscribe('pokemon-list-updated', () => renderPokemonList());

//
document.getElementById('search-bar').addEventListener('input', debounceTrailing(300, (event) => {
    renderPokemonList(event.target.value);
}));

//
document.querySelector('button[data-action="export-tags"').addEventListener('click', exportPokemonData);
document.querySelector('button[data-action="import-tags"').addEventListener('click', importPokemonData);

//
document.querySelector('button[data-action="copy-list"').addEventListener('click', () => {

    //
    const results = document.querySelector('[data-name="pokemon-results"]');
    const pokemon = Array.from(results.querySelectorAll('.pokemon .name')).map(p => p.textContent).join(', ');

    //
    navigator.clipboard.writeText(pokemon).then(() => {
        toast(`Copied!`, 'success', 3000);
    });

});

//
document.querySelector('[data-name="pokemon-results"]').addEventListener('click', (event) => {

    //
    const card = event.target.closest('.pokemon');
    if (!card) {
        return;
    }

    //
    const id = card.dataset.id;

    //the tag menu toggle never changes the selection
    const menuToggle = event.target.closest('[data-action="open-tag-menu"]');
    if (menuToggle) {
        toggleTagMenu(menuToggle, id);
        return;
    }

    //shift adds everything from the last clicked card to this one
    if (event.shiftKey) {
        selectRange(getVisiblePokemonIds(), id);
        return;
    }

    //the checkbox and ctrl/cmd+click toggle just this card
    if (event.ctrlKey || event.metaKey || event.target.closest('[data-action="toggle-selection"]')) {
        toggleSelection(id);
        return;
    }

    //a plain click selects only this card
    selectOnly(id);

});

//ctrl/cmd+a selects every visible card (unless typing in the search)
document.addEventListener('keydown', (event) => {

    //
    if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'a') {
        return;
    }

    //
    if (event.target.closest('input, textarea, [contenteditable]')) {
        return;
    }

    //
    event.preventDefault();
    selectAll(getVisiblePokemonIds());

});

//keep the highlighted cards in step with the selection
subscribe('selection-changed', () => {

    //
    const results = document.querySelector('[data-name="pokemon-results"]');

    //the checkboxes are faint until a selection has been started
    results.classList.toggle('has-selection', (getSelection().length > 0));

    //
    results.querySelectorAll('.pokemon').forEach(card => {
        card.classList.toggle('selected', isSelected(card.dataset.id));
    });

});

//tags belong to a collection, so a selection doesn't carry over
subscribe('collection-changed', clearSelection);
