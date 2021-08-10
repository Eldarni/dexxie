
//
import React, { useState } from 'react';

//
import { useTagState } from '../context/TagContext';

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
    const tagState = useTagState();

    //
    const [searchString, setSearchString] = useState('');

    //pass the pasted html into state, this will cause the pastebox to re-render
    const onSearch = (event) => {
        setSearchString(event.target.value);
    };

    //supply the user's tags to the search system, as we want to filter against these
    const userTags = tagState.getAllTags().reduce((carry, tag) => [ ...carry, tag.tag.toLowerCase() ], []);

    //filter the base list of pokemon by the search string
    const filteredPokemon = ((searchString !== '') ? pokemonSearch(props.pokemon, userTags, searchString) : props.pokemon);

    //------------------------------------------------------------------------------

    //
    const [selectedPokemon, setSelectedPokemon] = useState([]);
    const onSelectionChangeHandler = function(selection) {
        setSelectedPokemon(selection.reduce((carry, pokemon) => { 
            return { ...carry, [pokemon] : filteredPokemon[pokemon] }
        }, {}));
    }

    const handleSelectAll = (event) => {
        setSelectedPokemon(filteredPokemon);
    };

    const handleClearAll = (event) => {
        setSelectedPokemon({});
    };

    //------------------------------------------------------------------------------

    //integrate with the scrollbar component to adda "scroll-to-top" feature
    const ScrollRef = React.useRef(null);
    const handleScrollToTop = (event) => {
        ScrollRef.current.scrollToTop();
    }

    //------------------------------------------------------------------------------

    //
    return (
        <React.Fragment>

            <ControlBar search={onSearch} searchString={searchString} handleSelectAll={handleSelectAll} handleClearAll={handleClearAll} handleScrollToTop={handleScrollToTop} currentProfile={props.currentProfile} setShowProfilesPopop={props.setShowProfilesPopop} setShowTagsPopop={props.setShowTagsPopop}></ControlBar>

            <div className="pokedex-outer">
                <Scrollable ref={ScrollRef}>
                    <div className="pokedex">
                        <Selectable selectedItems={Object.keys(selectedPokemon)} onSelectionChange={onSelectionChangeHandler}>
                            {Object.keys(filteredPokemon).map(function(key) {
                                return <PokeCard key={key} details={filteredPokemon[key]}></PokeCard>
                            })}
                        </Selectable>
                    </div>
                </Scrollable>
            </div>

            <TagContextMenu selector='.pokemon[data-selected="yes"]' selectedPokemon={selectedPokemon} />

        </React.Fragment>
    );

    //------------------------------------------------------------------------------

}

export default Pokedex;
