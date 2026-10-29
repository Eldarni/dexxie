
//
import { setLocalStorageJSON } from '../../utilities/storage.mjs';
import { toast } from '../../utilities/toaster.mjs';

//
import { getCollection } from './store.mjs';

//
import { emit } from '../../utilities/events.mjs';

//
import { triggerFileUpload } from '../../utilities/triggerFileUpload.mjs';

//
export async function importPokemonData() {

    //
    try {

        //
        const { id: collection } = getCollection();

        //nothing picked (the dialog was cancelled), so leave everything as it is
        const file = await triggerFileUpload('application/json');
        if (file === null) {
            return;
        }

        //
        const importData = JSON.parse(file);

        //the same shape as an export, each id keyed to a list of tags
        if (!isTaggedPokemon(importData)) {
            throw new Error('Not a tagged pokemon export');
        }

        //
        setLocalStorageJSON(`${collection}:pokemon`, importData);

        //
        emit('pokemon-list-updated');

        //
        toast('Import successful!', 'success', 3000);


    } catch (error) {
        toast('Import failed.', 'error', -1);
    }

}

//an object (not an array or null) where every value is a list of tag strings
function isTaggedPokemon(data) {
    return (data !== null) && (typeof data === 'object') && !Array.isArray(data) && Object.values(data).every(tags => Array.isArray(tags) && tags.every(tag => typeof tag === 'string'));
}
