import React, { useState, useEffect } from 'react';


//
import Scrollable from "react-scrollbars-custom";

import cloneDeep from 'lodash.clonedeep';

import concatUnique from '../utils/concatUnique';
import pokemonSearch from '../utils/pokemonSearch';

//
import ControlBar from './ControlBar';

import Selectable from './Selectable';
import PokeDexSelectionInfo from './PokeDexSelectionInfo';
import PokeCard from './PokeCard';

import basePokemonData from '../static/pokemon.json';

const Pokedex = (props) => {

    //clone the base pokemon data so we can mutate it safely
    const pokemonData = cloneDeep(basePokemonData);

    //store the user's data in state
    const [userData, setUserData] = useState(() => {
        return JSON.parse(window.localStorage.getItem('user-data')) || {};
    });

    //save the user's data to local storage
    useEffect(() => {
        window.localStorage.setItem('user-data', JSON.stringify(userData));
    });

    //------------------------------------------------------------------------------

    const [selectedPokemon, setSelectedPokemon] = useState([]);
    const onSelectionChangeHandler = function(selection) {
        setSelectedPokemon(selection);
    }
    
    //------------------------------------------------------------------------------

    //merge the contents of the user's personal tags into the main tag list
    Object.keys(userData).forEach(function(pokemon) {
        if (pokemon in pokemonData) {
            pokemonData[pokemon]['tags'] = concatUnique(pokemonData[pokemon]['tags'], userData[pokemon]);
        }
    });

    //------------------------------------------------------------------------------

    //
    const [searchString, setSearchString] = useState('');

    //pass the pasted html into state, this will cause the pastebox to re-render
    const onSearch = (event) => {
        setSearchString(event.target.value);
    };

    //filter the base list of pokemon by the search string
    let filteredPokemon = pokemonData;
    if (searchString !== '') {
        filteredPokemon = pokemonSearch(pokemonData, searchString);
    } 

    //------------------------------------------------------------------------------

    //------------------------------------------------------------------------------

    const handleAddTags = (event) => {

    };
    
    const handleSelectAll = (event) => {
        setSelectedPokemon(Object.keys(filteredPokemon));
    };

    const handleClearAll = (event) => {
        setSelectedPokemon([]);
    };

    //------------------------------------------------------------------------------

    //
    return (
        <React.Fragment>

            <ControlBar search={onSearch} searchString={searchString}></ControlBar>

            <PokeDexSelectionInfo selectedItems={selectedPokemon} onAddTags={handleAddTags} onSelectAll={handleSelectAll} onClearAll={handleClearAll}></PokeDexSelectionInfo>
            
            <Scrollable>
                <div className="pokedex">
                    <Selectable selectedItems={selectedPokemon} onSelectionChange={onSelectionChangeHandler}>
                        {Object.keys(filteredPokemon).map(function(key) {
                            return <PokeCard key={key} details={filteredPokemon[key]}></PokeCard>
                        })}
                    </Selectable>
                </div>
            </Scrollable>

        </React.Fragment>
    );

    //------------------------------------------------------------------------------

}

export default Pokedex;
