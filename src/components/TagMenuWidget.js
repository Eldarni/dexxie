
//
import React from 'react';

//
import Scrollable from "react-scrollbars-custom";

//
import { useTagState } from '../context/TagContext';

//
import DropdownMenu from './DropdownMenu';

//
export default (props) => {

    //
    const tags = useTagState();

    //
    return (
        <div className="TagMenuWidget">
            <DropdownMenu label="Tags">
                
                <div className="tags-wrapper" style={{height:'500px'}}>
                    <Scrollable>
                        <div className="tags-inner">
                            {tags.map((tag) => <TagMenuItem key={tag.id} tag={tag} />)}
                        </div>
                    </Scrollable>
                </div>

                <div className="tags-menu-footer" onClick={() => {props.setShowTagsPopop(true); }}>
                    Edit Tags
                </div>

            </DropdownMenu>
        </div>
    );

}

//
const TagMenuItem = (props) => {
    return (<div className="menu-item" onClick={props.onClick}>{props.tag.name}</div>);
};
