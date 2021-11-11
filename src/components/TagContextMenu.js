
//
import React from 'react';
import { useRecoilValue } from 'recoil';

//
import { userTagsState } from '../store';

//
import { useProfileState }  from '../context/ProfileContext';

//
import ContextMenu, { ContextMenuItem, ContextMenuDivider } from './ContextMenu';

//
export default (props) => {

    //
    const profileState = useProfileState();

    //
    const userTags = useRecoilValue(userTagsState);

    //all i need in this is a array - so lets convert our selectedPokemon into an array
    const selectedPokemon = Object.values(props.selectedPokemon);

    //
    const tags = userTags.map((tag) => {

        //
        const selectedPokemonWithTag = selectedPokemon.filter((pokemon) => {
            return pokemon.tags.includes(tag.tag);
        });

        //
        let updateSelectedPokemonTags = null, appears = false;

        //assign an appropiate handler to update the tags on the selected pokemon (add the tag, unless all the pokemon already have the tag)
        if (selectedPokemonWithTag.length !== selectedPokemon.length) {
            updateSelectedPokemonTags = () => { profileState.addTagToPokemon(selectedPokemon, tag.tag); };
        } else {
            updateSelectedPokemonTags = () => { profileState.removeTagFromPokemon(selectedPokemon, tag.tag); };
        }

        //
        appears = ((selectedPokemonWithTag.length === selectedPokemon.length) ? 'all' : ((selectedPokemonWithTag.length > 0) ? 'some' : 'never'));

        //
        return { ...tag, updateSelectedPokemonTags, appears };

    });

    //
    return (
        <ContextMenu selector={props.selector}>
            {tags.map((tag) => { 
                return (<ContextMenuItem key={tag.id} onClick={tag.updateSelectedPokemonTags} className={((tag.appears === 'some') ? 'indeterminate' : null)} selected={(tag.appears === 'all' || tag.appears === 'some')}>{tag.tag}</ContextMenuItem>);
            })}
            <ContextMenuDivider />
            <ContextMenuItem>Clear All Tags</ContextMenuItem>
        </ContextMenu>
    );

}