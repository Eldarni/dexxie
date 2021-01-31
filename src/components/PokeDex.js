
//
import React, { useState } from 'react';


//
import Scrollable from "react-scrollbars-custom";

//

import pokemonSearch from '../utils/pokemonSearch';

//
import ControlBar from './ControlBar';

//
import Selectable from './Selectable';
import PokeDexSelectionInfo from './PokeDexSelectionInfo';
import PokeCard from './PokeCard';


const Pokedex = (props) => {

    //------------------------------------------------------------------------------

    const [selectedPokemon, setSelectedPokemon] = useState([]);
    const onSelectionChangeHandler = function(selection) {
        setSelectedPokemon(selection);
    }

    //------------------------------------------------------------------------------

    //
    const [searchString, setSearchString] = useState('');

    //pass the pasted html into state, this will cause the pastebox to re-render
    const onSearch = (event) => {
        setSearchString(event.target.value);
    };

    //filter the base list of pokemon by the search string
    let filteredPokemon = props.pokemon;
    if (searchString !== '') {
        filteredPokemon = pokemonSearch(props.pokemon, searchString);
    }

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
