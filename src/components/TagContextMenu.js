
//
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

//
import { currentProfileDataState, userTagsState } from '../store';

//
import ContextMenu, { ContextMenuItem, ContextMenuDivider } from './ContextMenu';

//
export default (props) => {

    //
    const [currentProfile, setCurrentProfile] = useRecoilState(currentProfileDataState);
    const userTags = useRecoilValue(userTagsState);

    //all i need in this is a array - so lets convert our selectedPokemon into an array
    const selectedPokemon = Object.values(props.selectedPokemon);

    //
    const tags = userTags.map((tag) => {

        //
        const selectedPokemonWithTag = selectedPokemon.filter((pokemon) => {
            return pokemon.tags.includes(tag.tag);
        });

        //merge in an flag to indicate if this tag appears none of the time, some of the time or all of the time
        return { ...tag, 'appears': ((selectedPokemonWithTag.length === selectedPokemon.length) ? 'all' : ((selectedPokemonWithTag.length > 0) ? 'some' : 'none')) };

    });

    //
    const addTagToSelection = (tag) => {

        //
        let newTagData = {};

        //do this with no mutation!
        Object.keys(props.selectedPokemon).map((pokemon) => {
            if (!props.selectedPokemon[pokemon].tags.includes(tag)) {
                newTagData[pokemon] = [ ...props.selectedPokemon[pokemon].tags, tag ];
            } else {
                newTagData[pokemon] = props.selectedPokemon[pokemon].tags;
            }
        });

        //
        setCurrentProfile({ ...currentProfile, 'tags': { ...currentProfile.tags, ...newTagData }});

    }

    //
    const removeTagFromSelection = (tag) => {

        //
        let newTagData = {};

        //do this with no mutation!
        Object.keys(props.selectedPokemon).map((pokemon) => {
            newTagData[pokemon] = props.selectedPokemon[pokemon].tags.filter((v) => v !== tag);
        });

        //
        setCurrentProfile({ ...currentProfile, 'tags': { ...currentProfile.tags, ...newTagData }});

    }

    //
    return (
        <ContextMenu selector={props.selector}>
            {tags.map((tag) => { 
                return (<ContextMenuItem key={tag.id} onClick={() => (tag.appears === 'none') ? addTagToSelection(tag.tag) : removeTagFromSelection(tag.tag) } className={((tag.appears === 'some') ? 'indeterminate' : null)} selected={(tag.appears === 'all' || tag.appears === 'some')}>{tag.tag}</ContextMenuItem>);
            })}
            <ContextMenuDivider />
            <ContextMenuItem>Clear All Tags</ContextMenuItem>
        </ContextMenu>
    );

}