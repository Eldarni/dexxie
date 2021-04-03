
//
import React from 'react'

//
import { v4 as randomUUID } from 'uuid';

//
import createReducer from '../utils/createReducer';

//
const TagStateContext    = React.createContext();
const TagDispatchContext = React.createContext();

//
const addTag = (state, action) => {
    return [ ...state, { id : randomUUID(), ...action.tag } ];
};

//
const updateTag = (state, action) => { 
    return state.map((value) => {
        return {...value, ...((value.id === action.tag.id) ? action.tag : {}) };
    });
};

//
const removeTag = (state, action) => {
    return [...state.filter((value) => { return !(value.id === action.tag.id); })];
};

//
const tagReducer = createReducer([], {
    add:    addTag,
    update: updateTag,
    remove: removeTag,
});

//
function TagProvider({children}) {

    //
    const [state, dispatch] = React.useReducer(tagReducer, (() => {
        return JSON.parse(window.localStorage.getItem('tags')) || [];
    })());

    //
    React.useEffect(() => {
        window.localStorage.setItem('tags', JSON.stringify(state));
    });

    //
    return (
        <TagStateContext.Provider value={state}>
            <TagDispatchContext.Provider value={dispatch}>
                {children}
            </TagDispatchContext.Provider>
        </TagStateContext.Provider>
    );
}

//
function useTag() {
    return [useTagState(), useTagDispatch()];
}

//
function useTagState() {
    const context = React.useContext(TagStateContext);
    if (context === undefined) {
        throw new Error('useTagState must be used within a TagProvider');
    }
    return context;
}

//
function useTagDispatch() {
    const context = React.useContext(TagDispatchContext);
    if (context === undefined) {
        throw new Error('useTagDispatch must be used within a TagProvider');
    }
    return context;
}

//
export {TagProvider, useTag, useTagState, useTagDispatch};