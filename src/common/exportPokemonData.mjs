
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

    //
    const data = Object.entries(pokemon).map(([id, tags]) => ({ id, tags }));

    //
    triggerFileDownload('tagged-pokemon.json', 'application/json', JSON.stringify(data, null, 2));

}
