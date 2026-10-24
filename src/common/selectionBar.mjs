
//
import { getTags, getTaggedPokemon, setPokemonTag } from './store.mjs';

//
import { getSelection, clearSelection } from './selection.mjs';

//
import { getVisiblePokemonIds, getPokemonCounts } from './renderPokemonList.mjs';

//
import { createTagStateButton } from './createTagStateButton.mjs';

//
import { subscribe, emit } from '../../utilities/events.mjs';

//
import { lockButton } from '../../utilities/lockButton.mjs';

//
const bar = document.querySelector('[data-name="selection-bar"]');
const count = bar.querySelector('[data-name="selection-count"]');
const tags = bar.querySelector('[data-name="selection-tags"]');

//
export function initialiseSelectionBar() {

    //
    subscribe('selection-changed', renderSelectionBar);
    subscribe('pokemon-list-rendered', renderSelectionBar);
    subscribe('tags-updated', renderSelectionBar);

    //a tag changed, only the states need refreshing
    subscribe('pokemon-tags-changed', updateTagStates);

    //
    bar.addEventListener('click', (event) => {

        //
        if (event.target.closest('[data-action="clear-selection"]')) {
            clearSelection();
            return;
        }

        //
        const button = event.target.closest('[data-action="toggle-tag"]');
        if (!button || button.dataset.locked) {
            return;
        }

        //a mixed or empty tag gets added to everything, a full one gets removed from everything
        setPokemonTag(getSelection(), button.dataset.tag, (button.dataset.state !== 'on'));

        //refreshes the tag states here and the sprites on the cards
        emit('pokemon-tags-changed');

        //
        lockButton(button);

    });

}

//
function renderSelectionBar() {

    //
    const selection = getSelection();

    //the bar is always shown (so the grid doesn't jump), without a selection it just shows the count
    bar.toggleAttribute('data-has-selection', (selection.length > 0));
    if (selection.length === 0) {
        const { visible, total } = getPokemonCounts();
        count.textContent = `Showing ${visible.toLocaleString('en-GB')} of ${total.toLocaleString('en-GB')} Pokémon`;
        tags.replaceChildren();
        return;
    }

    //
    const visibleIds = new Set(getVisiblePokemonIds());
    const hiddenCount = selection.filter(id => !visibleIds.has(id)).length;

    //
    count.textContent = `${selection.length.toLocaleString('en-GB')} selected` + ((hiddenCount > 0) ? ` (${hiddenCount.toLocaleString('en-GB')} hidden)` : '');

    //
    tags.replaceChildren(...getTags().map(tag => createTagStateButton(tag, 'off', 'tag')));

    //
    updateTagStates();

}

//set each tag button to on (all selected have it), mixed (some do) or off (none do)
function updateTagStates() {

    //
    const selection = getSelection();
    const taggedPokemon = getTaggedPokemon();

    //
    tags.querySelectorAll('[data-action="toggle-tag"]').forEach(button => {

        //
        const taggedCount = selection.filter(id => taggedPokemon[id]?.includes(button.dataset.tag)).length;

        //
        const state = ((taggedCount === 0) ? 'off' : ((taggedCount === selection.length) ? 'on' : 'mixed'));

        //
        button.setAttribute('data-state', state);

    });

}
