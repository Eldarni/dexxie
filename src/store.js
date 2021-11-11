
//
import { atom, atomFamily, selector } from 'recoil';

//
const localStorageEffect = () => {
    return ({node, setSelf, onSet}) => {

        //
        const savedValue = localStorage.getItem(node.key)
        if (savedValue != null) {
            setSelf(JSON.parse(savedValue));
        }

        //
        onSet((newValue, oldValue, isReset) => {
            if (isReset) {
                localStorage.removeItem(node.key);
            } else {
                localStorage.setItem(node.key, JSON.stringify(newValue));
            }
        });

    };
};

//
export const displayModeState = atom({
    'key'     : 'displayMode',
    'default' : 'standard',
    effects_UNSTABLE: [
        localStorageEffect(),
    ]
});

//
export const currentProfileState = atom({
    'key'     : 'currentProfile',
    'default' : '92503e70-c4ca-42d2-9a06-9f26870e66c3',
    effects_UNSTABLE: [
        localStorageEffect(),
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
        localStorageEffect(),
    ]
});

//
const userProfilesInitialState = { 'icon': '/icons/151-mew.svg', 'name': 'National Dex', 'filter': null, 'tags': {} };

//
export const userProfilesState = atomFamily({
    'key'     : 'userProfiles',
    'default' : userProfilesInitialState,
    effects_UNSTABLE: [
        localStorageEffect(),
    ]
});

//
export const currentProfileDataState = selector({
    'key': 'currentUserProfile',
    'get': ({get}) => {
        return get(userProfilesState(get(currentProfileState)));
    },
    'set': ({set, get}, newValue) => {
        return set(userProfilesState(get(currentProfileState)), newValue)
    },
});