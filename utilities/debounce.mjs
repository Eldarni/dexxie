
//
export function debounceTrailing(delay, fn) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

//
export function debounceLeading(delay, fn) {
    let timeout;
    let called = false;
    return function(...args) {
        if (!called) {
            fn.apply(this, args);
                called = true;
                timeout = setTimeout(() => {
                called = false;
            }, delay);
        }
    };
}