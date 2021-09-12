
//
import React from 'react'

//
import createReducer from '../utils/createReducer';

//
const initialState = {
    'currentProfile' : '92503e70-c4ca-42d2-9a06-9f26870e66c3',
    'displayMode'    : 'standard'
};

//
const ApplicationStateContext = React.createContext();

//
const setCurrentProfile = (state, action) => {
    return { ...state, 'currentProfile' : action.currentProfile };
};

//
const setDisplayMode = (state, action) => {
    return { ...state, 'displayMode' : action.displayMode };
};

//
const applicationReducer = createReducer([], {
    'set-current-profile' : setCurrentProfile,
    'set-display-mode'    : setDisplayMode,
});

//
function ApplicationProvider(props) {

    //------------------------------------------------------------------------------

    //
    const [state, dispatch] = React.useReducer(applicationReducer, (() => {
        return JSON.parse(window.localStorage.getItem('application')) || initialState;
    })());

    //
    React.useEffect(() => {
        window.localStorage.setItem('application', JSON.stringify(state));
    }, [state]);

    //------------------------------------------------------------------------------

    //
    let context = {};

    //
    context.getCurrentProfileID = () => {
        return state.currentProfile;
    };

    //
    context.changeProfile = (profileID) => {
        dispatch({'type': 'set-current-profile', 'currentProfile' : profileID });
    };

    //
    context.getCurrentDisplayMode = () => {
        return state.displayMode;
    };

    //
    context.changeDisplayMode = (displayMode) => {
        dispatch({'type': 'set-display-mode', 'displayMode' : displayMode });
    };

    //------------------------------------------------------------------------------

    //
    return (
        <ApplicationStateContext.Provider value={context}>
            {props.children}
        </ApplicationStateContext.Provider>
    );

    //------------------------------------------------------------------------------
}

//
function useApplicationState() {
    const context = React.useContext(ApplicationStateContext);
    if (context === undefined) {
        throw new Error('useApplicationState must be used within a ApplicationProvider');
    }
    return context;
}

//
export { ApplicationProvider, useApplicationState };