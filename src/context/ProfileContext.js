
//
import React from 'react'

//
import { useApplicationState }  from '../context/ApplicationContext';

//
import { v4 as randomUUID } from 'uuid';

//
import createReducer from '../utils/createReducer';

//
const initialState = [
    { 'id': '92503e70-c4ca-42d2-9a06-9f26870e66c3', 'name': 'National Dex', 'filter': null, 'tags': {} }
];

//
const ProfileStateContext    = React.createContext();

//
const addProfile = (state, action) => {
    return [ ...state, { id : randomUUID(), ...action.profile } ];
};

//
const updateProfile = (state, action) => {
    return state.map((value) => {
        return {...value, ...((value.id === action.profile.id) ? action.profile : {}) };
    });
};

//
const updateProfileTags = (state, action) => {
    return state.map((value) => {
        return {...value, ...((value.id === action.profile.id) ? { ...action.profile, 'tags' : action.tags } : action.profile) };
    });
};

//
const removeProfile = (state, action) => {
    return [...state.filter((value) => { return !(value.id === action.profile.id); })];
};

//
const profileReducer = createReducer([], {
    'add'           : addProfile,
    'update'        : updateProfile,
    'update-tags'   : updateProfileTags,
    'remove'        : removeProfile,
});

//
function ProfileProvider(props) {

    //------------------------------------------------------------------------------

    //
    const applicationState = useApplicationState();

    //------------------------------------------------------------------------------

    //
    const [state, dispatch] = React.useReducer(profileReducer, (() => {
        return JSON.parse(window.localStorage.getItem('profiles')) || initialState;
    })());

    //
    React.useEffect(() => {
        window.localStorage.setItem('profiles', JSON.stringify(state));
    });

    //------------------------------------------------------------------------------

    //
    let context = {};

    //
    context.getAllProfiles = () => {
        return state;
    };

    //
    context.getProfileByID = (id) => {
        return state.filter(profile => profile.id === id).pop();
    };

    //
    context.getCurrentProfile = () => {
        return context.getProfileByID(applicationState.getCurrentProfileID()) || {};
    };

    //------------------------------------------------------------------------------

    //
    context.addTagToPokemon = (pokemon, tagToAdd) => {

        //
        const currentProfile = context.getCurrentProfile();

        //
        const currentProfileNewTags = pokemon.reduce((carry, pokemon) => {
            return { ...carry, [pokemon.id]: [...new Set([...(carry[pokemon.id] || []), tagToAdd])] };
        }, currentProfile.tags);

        //
        dispatch({'type': 'update-tags', 'profile' : currentProfile, 'tags' : currentProfileNewTags  });

    };

    //
    context.removeTagFromPokemon = (pokemon, tagToRemove) => {

        //
        const currentProfile = context.getCurrentProfile();

        //
        const currentProfileNewTags = pokemon.reduce((carry, pokemon) => {
            return { ...carry, [pokemon.id]: (carry[pokemon.id] || []).filter((tag) => tag !== tagToRemove) };
        }, currentProfile.tags)

        //
        dispatch({'type': 'update-tags', 'profile' : currentProfile, 'tags' : currentProfileNewTags  });

    };

    //------------------------------------------------------------------------------

    //
    return (
        <ProfileStateContext.Provider value={context}>
            {props.children}
        </ProfileStateContext.Provider>
    );

}

//
function useProfileState() {
    const context = React.useContext(ProfileStateContext);
    if (context === undefined) {
        throw new Error('useProfileState must be used within a ProfileProvider');
    }
    return context;
}

//
export { ProfileProvider, useProfileState };