
//
import { getLocalStorageJSON } from '../../utilities/storage.mjs';

//
import { triggerFileDownload } from '../../utilities/triggerFileDownload.mjs';

//
import { getCurrentCollection } from './store.mjs';

//
export function exportPokemonData() {

    //
    const collection = getCurrentCollection();
    const pokemon = getLocalStorageJSON(`${collection}:pokemon`, {});

    //
    const data = Object.entries(pokemon).map(([name, tags]) => ({ name, tags }));

    //
    triggerFileDownload('tagged-pokemon.json', 'application/json', JSON.stringify(data, null, 2));

}
