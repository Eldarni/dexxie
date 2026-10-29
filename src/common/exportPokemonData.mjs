
//
import { getLocalStorageJSON } from '../../utilities/storage.mjs';

//
import { triggerFileDownload } from '../../utilities/triggerFileDownload.mjs';

//
import { getCollection } from './store.mjs';

//
export function exportPokemonData() {

    //
    const { id: collection } = getCollection();

    //
    const pokemon = getLocalStorageJSON(`${collection}:pokemon`, {});

    //keyed by id, the same shape as the store, so the file can be imported back as it is
    triggerFileDownload('tagged-pokemon.json', 'application/json', JSON.stringify(pokemon, null, 2));

}
