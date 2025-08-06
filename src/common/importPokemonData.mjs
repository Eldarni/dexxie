
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

        //
        const importData = JSON.parse(await triggerFileUpload('application/json'));

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
