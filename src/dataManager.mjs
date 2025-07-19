
//
import { getLocalStorageJSON, setLocalStorageJSON } from '../utilities/storage.mjs';
import { toast } from '../utilities/toaster.mjs';

//
export function exportPokemonData() {

    //
    const dataStr = JSON.stringify(getLocalStorageJSON('pokemon', {}), null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    //
    const url = URL.createObjectURL(dataBlob);

    //
    const link = document.createElement('a');
    link.href = url
    link.download = `tagged-pokemon.json`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(link.href);

}

//
export async function importPokemonData() {
    return new Promise((resolve, reject) => {

        //append the input element to the page, and wait for an update
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.style.display = 'none';

        //
        document.body.appendChild(input);

        //
        input.click();

        //
        input.addEventListener('cancel', () => {
            document.body.removeChild(input);
            resolve(false);
        });

        //
        input.addEventListener('change', (event) => {

            //
            if (event?.target?.files[0] == null) {
                document.body.removeChild(input);
                resolve(false);
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                try {

                    //
                    const importData = JSON.parse(event.target.result);
                    setLocalStorageJSON('pokemon', importData);

                    //
                    toast('Import successful!', 'success', 3000);

                    //
                    resolve(true);

                } catch (error) {

                    //
                    toast('Import failed.', 'error', -1);

                    //
                    resolve(false);

                } finally {
                    document.body.removeChild(input);
                }
            };

            //
            reader.readAsText(event.target.files[0]);

        });

    });
}