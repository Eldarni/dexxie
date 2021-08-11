
//
import React from 'react'

//
import { v4 as randomUUID } from 'uuid';

//
import createReducer from '../utils/createReducer';

//
const initialState = [
    { 'id' : 'e7242c83-34f5-4ff9-84f4-38e1d0169b3b', 'tag' : 'Owned' },
    { 'id' : '891f5a8f-db93-4f5f-a219-f721ca8db723', 'tag' : 'Shiny' },
    { 'id' : '279f916c-247c-4f48-ac63-205145629b95', 'tag' : 'Lucky' }
];

//
const TagStateContext = React.createContext();

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
function TagProvider(props) {

    //------------------------------------------------------------------------------

    //
    const [state, dispatch] = React.useReducer(tagReducer, (() => {
        return JSON.parse(window.localStorage.getItem('tags')) || initialState;
    })());

    //
    React.useEffect(() => {
        window.localStorage.setItem('tags', JSON.stringify(state));
    });

    //------------------------------------------------------------------------------

    //
    let context = {};

    //
    context.getAllTags = () => {
        return state;
    };

    //
    context.getTagByID = (id) => {
        return state.filter((tag) => tag.id === id).pop();
    };

    //------------------------------------------------------------------------------

    //
    context.updateTag = (tag) => {
        dispatch({ 'type': 'update', 'tag' : tag });
    };
    
    //------------------------------------------------------------------------------

    //
    return (
        <TagStateContext.Provider value={context}>
            {props.children}
        </TagStateContext.Provider>
    );

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
export { TagProvider, useTagState };