
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

//
const userTagsInitialState = [
    { 'id' : 'e7242c83-34f5-4ff9-84f4-38e1d0169b3b', 'tag' : 'Owned' },
    { 'id' : '891f5a8f-db93-4f5f-a219-f721ca8db723', 'tag' : 'Shiny' },
    { 'id' : '279f916c-247c-4f48-ac63-205145629b95', 'tag' : 'Lucky' }
];

//
export const userTagsState = atom({
    'key'     : 'userTags',
    'default' : userTagsInitialState,
    effects_UNSTABLE: [
        localStorageEffect('userTags'),
    ]
});