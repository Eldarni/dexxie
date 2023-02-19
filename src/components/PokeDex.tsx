
//
import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

//
import { displayModeState, selectedPokemonState } from '../store';

//
import Scrollable from "react-scrollbars-custom";

//
import pokemonSearch from '../utils/pokemonSearch';

//
import ControlBar from './ControlBar';

//
import Selectable from './Selectable';
import PokeCard from './PokeCard';

//
import TagContextMenu from './TagContextMenu';

//
const Pokedex = (props) => {

    //------------------------------------------------------------------------------

    //
    const displayMode = useRecoilValue(displayModeState);

    //
    const [searchString, setSearchString] = useState('');

    //pass the pasted html into state, this will cause the pastebox to re-render
    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
    };

    //filter the base list of pokemon by the search string
    const filteredPokemon = ((searchString !== '') ? pokemonSearch(props.pokemon, searchString) : props.pokemon);

    //------------------------------------------------------------------------------

    //store the selected pokemon in an atom
    const [selectedPokemon, setSelectedPokemon] = useRecoilState(selectedPokemonState);
    
    //
    const handleSelectAll = () => {
        setSelectedPokemon(Object.keys(filteredPokemon));
    };

    //
    const handleClearAll = () => {
        setSelectedPokemon([]);
    };

    //------------------------------------------------------------------------------

    // //integrate with the scrollbar component to adda "scroll-to-top" feature
    // const ScrollRef = React.useRef<HTMLDivElement>(null);
    // const handleScrollToTop = (event) => {
    //     ScrollRef.current.scrollToTop();
    // }

    //------------------------------------------------------------------------------

    //
    return (
        <React.Fragment>

            <ControlBar search={onSearch} searchString={searchString} handleSelectAll={handleSelectAll} handleClearAll={handleClearAll} currentProfile={props.currentProfile}></ControlBar>

            <div className="pokedex-outer">
                {/* <Scrollable> */}
                    <div className={`pokedex ${displayMode}`}>
                        <Selectable selectedItems={selectedPokemon} onSelectionChange={setSelectedPokemon}>
                            {Object.keys(filteredPokemon).map(function(key) {
                                return <PokeCard key={key} details={filteredPokemon[key]}></PokeCard>
                            })}
                        </Selectable>
                    </div>
                {/* </Scrollable> */}
            </div>

            <TagContextMenu selector='.pokemon[data-selected="yes"]' />

        </React.Fragment>
    );

    //------------------------------------------------------------------------------

}

export default Pokedex;
