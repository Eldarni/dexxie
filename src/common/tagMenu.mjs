
//
import { getTags, getTaggedPokemon, togglePokemonTag } from './store.mjs';

//
import { createTagStateButton } from './createTagStateButton.mjs';

//
import { subscribe, emit } from '../../utilities/events.mjs';

//
import { lockButton } from '../../utilities/lockButton.mjs';

//one shared menu for every card, it lives outside the grid so the grid's scrolling doesn't clip it
const menu = document.querySelector('[data-name="tag-menu"]');

//the card button the menu is currently open for, and the pokemon it belongs to
let currentToggle = null;
let currentId = null;

//
export function initialiseTagMenu() {

    //
    menu.addEventListener('click', (event) => {

        //
        const button = event.target.closest('[data-action="toggle-tag"]');
        if (!button || button.dataset.locked) {
            return;
        }

        //
        const isTagged = togglePokemonTag(currentId, button.dataset.tag);

        //
        button.setAttribute('data-state', (isTagged ? 'on' : 'off'));

        //
        lockButton(button);

        //let the selection bar know, in case this pokemon is selected
        emit('pokemon-tags-changed');

    });

    //close on any click outside of the menu (and its toggle)
    document.addEventListener('click', (event) => {
        if (currentToggle && !menu.contains(event.target) && !currentToggle.contains(event.target)) {
            closeTagMenu();
        }
    });

    //
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeTagMenu();
        }
    });

    //the menu is positioned against the card, so close it if the card moves or disappears
    document.querySelector('[data-name="pokemon-results"]').addEventListener('scroll', closeTagMenu, { passive: true });
    window.addEventListener('resize', closeTagMenu);
    subscribe('pokemon-list-rendered', closeTagMenu);

}

//
export function toggleTagMenu(toggle, id) {

    //
    if (currentToggle === toggle) {
        closeTagMenu();
        return;
    }

    //
    closeTagMenu();

    //
    currentToggle = toggle;
    currentId = id;

    //
    const pokemonTags = getTaggedPokemon()[id] || [];

    //
    menu.replaceChildren(...getTags().map(tag => createTagStateButton(tag, (pokemonTags.includes(tag) ? 'on' : 'off'), 'dropdown-item')));

    //measure the menu, then open it below the toggle (or above it, if there isn't room below)
    const toggleRect = toggle.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const fitsBelow = (toggleRect.bottom + menuRect.height + 8 <= window.innerHeight);
    const top = ((fitsBelow || toggleRect.top < menuRect.height + 8) ? toggleRect.bottom + 4 : toggleRect.top - menuRect.height - 4);
    const left = Math.max(8, toggleRect.right - menuRect.width);

    //
    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;

    //
    toggle.classList.add('active');
    menu.classList.add('active');

}

//
export function closeTagMenu() {

    //
    if (!currentToggle) {
        return;
    }

    //
    currentToggle.classList.remove('active');
    menu.classList.remove('active');

    //
    currentToggle = null;
    currentId = null;

}
