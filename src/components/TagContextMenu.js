
//
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

//
import { currentProfileDataState, userTagsState, selectedPokemonTagsState } from '../store';

//
import ContextMenu, { ContextMenuItem, ContextMenuDivider } from './ContextMenu';

//
export default (props) => {

    //
    const [currentProfile, setCurrentProfile] = useRecoilState(currentProfileDataState);
    const userTags = useRecoilValue(userTagsState);

    //get the selected pokemon's tags
    const selectedPokemon = useRecoilValue(selectedPokemonTagsState);

    //
    const tags = userTags.map((tag) => {

        //
        const selectedPokemonWithTag = Object.values(selectedPokemon).filter((pokemon) => {
            return pokemon.includes(tag.tag);
        });

        //merge in an flag to indicate if this tag appears none of the time, some of the time or all of the time
        return { ...tag, 'appears': ((selectedPokemonWithTag.length === Object.values(selectedPokemon).length) ? 'all' : ((selectedPokemonWithTag.length > 0) ? 'some' : 'none')) };

    });

    //
    const addTagToSelection = (tag) => {

        //
        let newTagData = {};

        //do this with no mutation!
        Object.keys(selectedPokemon).map((pokemon) => {
            if (!selectedPokemon[pokemon].includes(tag)) {
                newTagData[pokemon] = [ ...selectedPokemon[pokemon], tag ];
            } else {
                newTagData[pokemon] = selectedPokemon[pokemon];
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
        Object.keys(selectedPokemon).map((pokemon) => {
            newTagData[pokemon] = selectedPokemon[pokemon].filter((v) => v !== tag);
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