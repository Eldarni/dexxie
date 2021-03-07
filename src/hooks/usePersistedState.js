
//
import { useState, useEffect } from 'react';

//
export default (label, initialState) => {

    //
    const [state, setState] = useState(() => {
        return JSON.parse(window.localStorage.getItem(label)) || initialState || {};
    });

    //
    useEffect(() => {
        window.localStorage.setItem(label, JSON.stringify(state));
    });

    //
    return [ state, setState ];

};