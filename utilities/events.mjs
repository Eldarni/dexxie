
//
const prefix = 'dexxie:';

//
export function subscribe(event, callback) {

    //
    const listener = (event) => {
        callback(event.detail);
    };

    //
    window.addEventListener(prefix + event, listener);

    //
    return () => {
        window.removeEventListener(prefix + event, listener);
    };

}

//
export function emit(event, data) {
    window.dispatchEvent(new CustomEvent(prefix + event, { detail: data }));
}
