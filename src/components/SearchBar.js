import React from 'react';

const SearchBar = (props) => {
    
    //
    return (
        <div className="searchbar">
            <input type="search" onChange={props.search} value={props.searchString} />
        </div>
    );

}

export default SearchBar;
