
//
function getLocalStorageJSON(key, defaultValue) {
    try {

        //
        const raw = localStorage.getItem(key);

        //
        if (!raw) {
            return defaultValue;
        }

        //
        return JSON.parse(raw);

    } catch (error) {
        return defaultValue;
    }
}

//
function setLocalStorageJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

//
export { getLocalStorageJSON, setLocalStorageJSON };