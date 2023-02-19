
//
import { atom, atomFamily, selector } from 'recoil'

//
const localStorageEffect = () => {
    return ({node, setSelf, onSet}) => {

        //
        const savedValue = localStorage.getItem(node.key)
        if (savedValue != null) {
            setSelf(JSON.parse(savedValue))
        }

        //
        onSet((newValue, oldValue, isReset) => {
            if (isReset) {
                localStorage.removeItem(node.key)
            } else {
                localStorage.setItem(node.key, JSON.stringify(newValue))
            }
        })

    }
}

//
export const displayModeState = atom({
    'key': 'displayMode',
    effects_UNSTABLE: [
        localStorageEffect(),
    ]
})

//
export const currentProfileState = atom({
    'key': 'currentProfile',
    effects_UNSTABLE: [
        localStorageEffect(),
    ]
})

//
export const userTagsState = atom({
    'key': 'userTags',
    effects_UNSTABLE: [
        localStorageEffect(),
    ]
})

//
export const userProfilesState = atomFamily({
    'key': 'userProfiles',
    effects_UNSTABLE: [
        localStorageEffect(),
    ]
})

//
export const currentProfileDataState = selector({
    'key': 'currentProfileData',
    'get': ({get}) => {
        return get(userProfilesState(get(currentProfileState)))
    },
    'set': ({set, get}, newValue) => {
        return set(userProfilesState(get(currentProfileState)), newValue)
    },
})

//
export const selectedPokemonState = atom({
    'key': 'selectedPokemon',
    'default' : [],
})

//
export const selectedPokemonTagsState = selector({
    'key': 'selectedPokemonTags',
    'get': ({get}) => {
        const currentProfile  = get(currentProfileDataState)
        const selectedPokemon = get(selectedPokemonState)
        return selectedPokemon.reduce((previous, pokemon) => {
            return { ...previous, [pokemon]: ((currentProfile.tags.hasOwnProperty(pokemon) ) ? currentProfile.tags[pokemon] : [])}
        }, {})
    },
})
