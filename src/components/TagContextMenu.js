
//
import React from 'react';

//
import ContextMenu, { ContextMenuItem, ContextMenuDivider } from './ContextMenu';

//
export default (props) => {

    //all i need in this is a array - so lets convert our selectedPokemon into an array
    const selectedPokemon = Object.values(props.selectedPokemon);

    //for now, hardcode a list of tags
    const tags = [
        {'id':'8c8483fc-bf64-48ae-965d-cde56e884b46', 'label': 'Owned'}, 
        {'id':'83b729b5-14c7-436d-8a0b-d61091b5cd3e', 'label': 'Shiny'}, 
        {'id':'457e7d10-f51d-48b2-9ede-4074c3b26872', 'label': 'Lucky'}
    ];

    //
    tags.forEach((tag) => {
        const selectedPokemonWithTag = selectedPokemon.filter((pokemon) => {
            return pokemon.tags.includes(tag.label);
        });
        tag.appears = ((selectedPokemonWithTag.length == selectedPokemon.length) ? 'all' : ((selectedPokemonWithTag.length > 0) ? 'some' : 'never'));
    });

    //
    return (
        <ContextMenu selector={props.selector}>
            {tags.map((tag) => { 
                return (<ContextMenuItem key={tag.id} className={((tag.appears == 'some') ? 'indeterminate' : null)} selected={(tag.appears == 'all' || tag.appears == 'some')}>{tag.label}</ContextMenuItem>);
            })}
            <ContextMenuDivider />
            <ContextMenuItem>Clear All Tags</ContextMenuItem>
        </ContextMenu>
    );

}