
//
import React from 'react'

//
import createReducer from '../utils/createReducer';

//
const ApplicationStateContext = React.createContext();

//
const setCurrentProfile = (state, action) => {
    return [ action.currentProfile ];
};

//
const applicationProfileReducer = createReducer([], {
    'set-current-profile': setCurrentProfile,
});

//
function ApplicationProvider(props) {

    //
    const [state, dispatch] = React.useReducer(applicationProfileReducer, (() => {
        return JSON.parse(window.localStorage.getItem('current-profile')) || ['92503e70-c4ca-42d2-9a06-9f26870e66c3'];
    })());

    //
    React.useEffect(() => {
        window.localStorage.setItem('current-profile', JSON.stringify(state));
    }, [state]);

    //
    let context = {};

    //
    context.getCurrentProfileID = () => {
        return state;
    };

    context.setCurrentProfileID = (profileID) => {
        dispatch('set-current-profile', profileID)
    };

    //
    return (
        <ApplicationStateContext.Provider value={context}>
            {props.children}
        </ApplicationStateContext.Provider>
    );
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