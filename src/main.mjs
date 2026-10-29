
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

//
import { renderPokemonList, filterPokemonList, updateAllCardTags, getVisiblePokemonIds } from './common/renderPokemonList.mjs';

//
import { initialiseSelectionBar } from './common/selectionBar.mjs';

//
initializeAndMigrateStores();

//
initialiseCollectionSelector();

//
initialiseSelectionBar();

//
const searchBar = document.getElementById('search-bar');

//the browser may restore text in the search box, so the first render applies it
renderPokemonList(searchBar.value);

//rebuild the cards, keeping whatever is in the search box applied
subscribe('pokemon-list-updated', () => renderPokemonList(searchBar.value));

//a tag may have changed, so the cards need refreshing (their tags, and the sprite for caught or shiny)
subscribe('pokemon-tags-changed', updateAllCardTags);

//searching only hides and shows the cards already built, so it's quick enough to run on every keystroke
searchBar.addEventListener('input', (event) => {
    filterPokemonList(event.target.value);
});

//
document.querySelector('button[data-action="export-tags"').addEventListener('click', exportPokemonData);
document.querySelector('button[data-action="import-tags"').addEventListener('click', importPokemonData);

//
document.querySelector('button[data-action="copy-list"').addEventListener('click', () => {

    //
    const results = document.querySelector('[data-name="pokemon-results"]');
    const pokemon = Array.from(results.querySelectorAll('.pokemon:not([hidden]) .name')).map(p => p.textContent).join(', ');

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

    //shift adds everything from the last clicked card to this one
    if (event.shiftKey) {
        selectRange(getVisiblePokemonIds(), id);
        return;
    }

    //ctrl/cmd+click toggles just this card
    if (event.ctrlKey || event.metaKey) {
        toggleSelection(id);
        return;
    }

    //a plain click on the only selected card clears the selection
    const selection = getSelection();
    if (selection.length === 1 && selection[0] === id) {
        clearSelection();
        return;
    }

    //otherwise a plain click selects only this card
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
    document.querySelectorAll('[data-name="pokemon-results"] .pokemon').forEach(card => {
        card.classList.toggle('selected', isSelected(card.dataset.id));
    });

});

//tags belong to a collection, so a selection doesn't carry over
subscribe('collection-changed', clearSelection);
