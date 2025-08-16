
//
import './style.scss';

//
import { toast } from '../utilities/toaster.mjs';

//
import { supabase } from './common/supabase.mjs';

//
import { initializeAndMigrateStores, togglePokemonTag } from './common/store.mjs';

//
import { initialiseCollectionSelector } from './common/collectionSelector.mjs';

//
import { subscribe } from '../utilities/events.mjs';

//
import { exportPokemonData } from './common/exportPokemonData.mjs';
import { importPokemonData } from './common/importPokemonData.mjs';

import { debounceLeading, debounceTrailing } from '../utilities/debounce.mjs';

//
import { renderPokemonList } from './common/renderPokemonList.mjs';

//
import { showPopup } from './popup.mjs';

//
initializeAndMigrateStores();

//
initialiseCollectionSelector();

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
    const pokemon = Array.from(results.querySelectorAll('.pokemon')).map(p => p.dataset.id).join(', ');

    //
    navigator.clipboard.writeText(pokemon).then(() => {
        toast(`Copied!`, 'success', 3000);
    });

});

//
document.querySelector('[data-name="pokemon-results"]').addEventListener('click', debounceLeading(300, (event) => {

    //
    if (event.target.dataset.action != 'toggle-tag') {
        return;
    }

    //
    const id = event.target.closest('.pokemon').dataset.id;

    //
    const tag = event.target.dataset.tag;

    //
    const isTagged = togglePokemonTag(id, tag);

    //
    event.target.setAttribute('data-state', (isTagged ? 1 : 0));

}));

//
document.querySelector('button[data-action="sign-in"').addEventListener('click', (event) => {
    showPopup('Sign in', (popup) => {
        popup.innerHTML = `
            <p>Sign in to your account to continue</p>
        `;
    });
});
