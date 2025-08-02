
//
import { createElement } from './createElement.mjs';

//
export function triggerFileDownload(filename, fileType = 'application/json', data) {

    //
    const dataBlob = new Blob([data], { type: fileType });

    //
    const url = URL.createObjectURL(dataBlob);

    //
    const link = createElement('a', { href: url, download: filename });

    //
    document.body.appendChild(link);

    //
    link.click();

    //
    document.body.removeChild(link);

    //
    URL.revokeObjectURL(link.href);

}
