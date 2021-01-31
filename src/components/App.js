
//
import React, { useState } from 'react';

//
import Header  from './Header';
import Content from './Content';
import Footer  from './Footer';

//
import SearchBar from './SearchBar';
import PokeDex from './PokeDex';

//
export default () => {

    //
    const [searchString, setSearchString] = useState('');

    //pass the pasted html into state, this will cause the pastebox to re-render
    const onSearch = (event) => {
        setSearchString(event.target.value);
    };

    //
    return (
        <React.Fragment>
            <Header />
            <Content>
                <SearchBar search={onSearch} searchString={searchString}></SearchBar>
                <PokeDex searchString={searchString}></PokeDex>
            </Content>
            <Footer />
        </React.Fragment>
    );

};