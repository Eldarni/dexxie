
//
import React from 'react'

//
import { useApplicationState }  from '../context/ApplicationContext';

//
import { v4 as randomUUID } from 'uuid';

//
import createReducer from '../utils/createReducer';

//
const ProfileStateContext    = React.createContext();
const ProfileDispatchContext = React.createContext();

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
const removeProfile = (state, action) => {
    return [...state.filter((value) => { return !(value.id === action.profile.id); })];
};

//
const profileReducer = createReducer([], {
    add:    addProfile,
    update: updateProfile,
    remove: removeProfile,
});

//
function ProfileProvider({children}) {

    //
    const [ currentProfileState ] = useApplicationState();

    //
    const [state, dispatch] = React.useReducer(profileReducer, (() => {
        return JSON.parse(window.localStorage.getItem('profiles')) || [];
    })());

    //
    React.useEffect(() => {
        window.localStorage.setItem('profiles', JSON.stringify(state));
    });

    //
    const getAllProfiles = () => {
        return state;
    };

    //
    const getProfileByID = (id) => {
        return state.filter(profile => profile.id === id).pop();
    };

    //
    const getCurrentProfile = (id) => {
        return getProfileByID(currentProfileState);
    };

    //
    return (
        <ProfileStateContext.Provider value={{getAllProfiles, getProfileByID, getCurrentProfile}}>
            <ProfileDispatchContext.Provider value={dispatch}>
                {children}
            </ProfileDispatchContext.Provider>
        </ProfileStateContext.Provider>
    );
}

//
function useProfile() {
    return [useProfileState(), useProfileDispatch()];
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
function useProfileDispatch() {
    const context = React.useContext(ProfileDispatchContext);
    if (context === undefined) {
        throw new Error('useProfileDispatch must be used within a ProfileProvider');
    }
    return context;
}

//
export {ProfileProvider, useProfile, useProfileState, useProfileDispatch};