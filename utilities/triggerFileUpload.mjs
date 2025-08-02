
//
import { createElement } from './createElement.mjs';

//
export function triggerFileUpload(accept = null) {
    return new Promise((resolve, reject) => {

        //
        const input = createElement('input', { type: 'file', accept });

        //
        document.body.appendChild(input);

        //
        input.click();

        //
        input.addEventListener('cancel', () => {
            resolve(null);
        });

        //
        input.addEventListener('change', (event) => {

            //
            if (event?.target?.files[0] == null) {
                resolve(null);
                return;
            }

            //
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            };

            //
            reader.readAsText(event.target.files[0]);

        });

        //
        document.body.removeChild(input);

    });
}

