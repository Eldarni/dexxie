
//
import { atom } from 'recoil';

//
const localStorageEffect = (key) => {
    return ({setSelf, onSet}) => {

        //
        const savedValue = localStorage.getItem(key)
        if (savedValue != null) {
            setSelf(JSON.parse(savedValue));
        }

        //
        onSet((newValue, oldValue, isReset) => {
            if (isReset) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, JSON.stringify(newValue));
            }
        });

    };
};

//
export const displayModeState = atom({
    'key'     : 'displayMode',
    'default' : 'standard',
    effects_UNSTABLE: [
        localStorageEffect('displayMode'),
    ]
});
