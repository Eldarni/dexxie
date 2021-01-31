
//
import React, { useState } from 'react';

//
import Header  from './Header';
import Content from './Content';
import Footer  from './Footer';

//
import ControlBar from './ControlBar';
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
                <ControlBar search={onSearch} searchString={searchString}></ControlBar>
                <PokeDex searchString={searchString}></PokeDex>
            </Content>
            <Footer />
        </React.Fragment>
    );

};