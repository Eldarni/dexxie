
//
function getLocalStorageJSON(key, defaultValue) {
    try {

        //
        const raw = localStorage.getItem(key);

        //
        if (!raw) {
            setLocalStorageJSON(key, defaultValue);
            return defaultValue;
        }

        //
        return JSON.parse(raw);

    } catch (error) {
        setLocalStorageJSON(key, defaultValue);
        return defaultValue;
    }
}

//
function setLocalStorageJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

//
export { getLocalStorageJSON, setLocalStorageJSON };