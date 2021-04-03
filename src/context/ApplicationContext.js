
//
import React from 'react'

//
import createReducer from '../utils/createReducer';

//
const ApplicationStateContext    = React.createContext();
const ApplicationDispatchContext = React.createContext();

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
        return JSON.parse(window.localStorage.getItem('current-profile')) || '';
    })());

    //
    React.useEffect(() => {
        window.localStorage.setItem('current-profile', JSON.stringify(state));
    }, [state]);

    //
    return (
        <ApplicationStateContext.Provider value={state}>
            <ApplicationDispatchContext.Provider value={dispatch}>
                {props.children}
            </ApplicationDispatchContext.Provider>
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
function useApplicationDispatch() {
    const context = React.useContext(ApplicationDispatchContext);
    if (context === undefined) {
        throw new Error('useApplicationDispatch must be used within a ApplicationProvider');
    }
    return context;
}

//
export { ApplicationProvider, useApplicationState, useApplicationDispatch};