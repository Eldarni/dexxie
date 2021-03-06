
//
import React, { useState, useEffect } from 'react';

//
import pokemonList from '../static/pokemon.json';

//
import Header  from './Header';
import Content from './Content';
import Footer  from './Footer';

//
import concatUnique from '../utils/concatUnique';

//
import PokeDex from './PokeDex';

//
import { ProfileProvider }  from '../context/ProfileContext';
//
export default () => {

    //store the user's data in state
    const [userData, setUserData] = useState(() => {
        return JSON.parse(window.localStorage.getItem('user-data')) || {};
    });

    //save the user's data to local storage
    useEffect(() => {
        window.localStorage.setItem('user-data', JSON.stringify(userData));
    });

    //merge the contents of the user's personal tags into the main tag list
    Object.keys(userData).forEach(function(pokemon) {
        if (pokemon in pokemonList) {
            pokemonList[pokemon]['tags'] = concatUnique(pokemonList[pokemon]['tags'], userData[pokemon]);
        }
    });

    //
    return (
        <ProfileProvider>
            <Header />
            <Content>
                <PokeDex pokemon={pokemonList}></PokeDex>
            </Content>
            <Footer />
        </ProfileProvider>
    );

};