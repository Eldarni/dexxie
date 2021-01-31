
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
    return (
        <React.Fragment>
            <Header />
            <Content>
                <PokeDex></PokeDex>
            </Content>
            <Footer />
        </React.Fragment>
    );

};