import React from 'react';

const PokeCard = (props) => {
    
    //
    let imageURL = `/icons/${props.details.number}-${props.details.id}.svg`;
    if (props.details.tags.includes('user:SHINY')) {
        imageURL = `/icons/${props.details.number}-${props.details.id}-shiny.svg`;
    }

    //add the functions to toggle the various tags
    const toggleFemale = function() {
        props.onToggleTag(props.details.id, 'FEMALE');
    }

    const toggleMale = function() {
        props.onToggleTag(props.details.id, 'MALE');
    }

    const toggleShiny = function() {
        props.onToggleTag(props.details.id, 'SHINY');
    }
    
    const toggleShadow = function() {
        props.onToggleTag(props.details.id, 'SHADOW');
    }

    const togglePurified = function() {
        props.onToggleTag(props.details.id, 'PURIFIED');
    }    

    const toggleLucky = function() {
        props.onToggleTag(props.details.id, 'LUCKY');
    }

    //
    return (
        <div className="pokemon" data-number={props.details.number} title={props.details.name} data-tags={props.details.tags.join(' ')} onClick={props.onToggleSelection} data-selected={((props.selected) ? 'yes' : 'no')}>
            <div className="pokemon-number">#{props.details.number}</div>
            <div className="pokemon-name">{props.details.name}</div>
            <img src={imageURL} alt={props.details.name} width="150" height="150"></img>
            <div className="pokemon-icons">
                <i title="Male" className="fas fa-mars" onClick={() => toggleMale()}></i>
                <i title="Female" className="fas fa-venus" onClick={() => toggleFemale()}></i>
                <i title="Shiny" className="far fa-lightbulb" onClick={() => toggleShiny()}></i>
                <i title="Shadow" className="fas fa-fire" onClick={() => toggleShadow()}></i>
                <i title="Purified" className="fas fa-star-of-life" onClick={() => togglePurified()}></i>
                <i title="Lucky" className="fas fa-dice-five" onClick={() => toggleLucky()}></i>
            </div>
        </div>
    );

    //------------------------------------------------------------------------------

}

export default PokeCard;
