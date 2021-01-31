import React, { useState } from 'react';

import Layout from './Layout';
import SearchBar from './SearchBar';
import PokeDex from './PokeDex';

function App() {

    //
    const [searchString, setSearchString] = useState('');

    //pass the pasted html into state, this will cause the pastebox to re-render
    const onSearch = (event) => {
        setSearchString(event.target.value);
    };

    return (
        <React.Fragment>
            <h1>Pokedex</h1>
            <SearchBar search={onSearch} searchString={searchString}></SearchBar>
            <PokeDex searchString={searchString}></PokeDex>
        </React.Fragment>
    );

}

export default App;
