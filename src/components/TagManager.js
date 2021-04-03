
//
import React from 'react';

//
import { useTagState, useTagDispatch } from '../context/TagContext';

//
import Form from './form/Form';
import Field from './form/Field';
import Submit from './form/Submit';


//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'

//
export default (props) => {

    //
    const tags = useTagState();

    //
    return (
        <div className="tags">
            {tags.map((tag) => <TagItem key={tag.id} tag={tag} />)}
        </div>
    );
}

//
const TagItem = (props) => {

    //
    const dispatch = useTagDispatch();

    //
    const [editEnabled, setEditEnabled] = React.useState(false);
    const toggleEditEnabled = () => setEditEnabled(!editEnabled);

    //
    const handleSubmit = (values) => {
        dispatch({'type': 'update', 'tag' : { ...props.tag, ...values }});
    };

    //
    if (!editEnabled) {
        return (
            <div className="tag" title={props.tag.name}>
                <div>{props.tag.name}</div>
                <div className="control-button" onClick={toggleEditEnabled} title="Edit"><FontAwesomeIcon size="lg" icon={faPencilAlt} /></div>
            </div>
        );
    }

    //
    return (
        <div className="tag" title={props.tag.name}>
            <div>
                <Form initialValues={props.tag} onSubmit={handleSubmit}>
                    <Field label="Name" type="text" name="name" ></Field>
                    <Submit />
                </Form>
            </div>
            <div className="control-button" onClick={toggleEditEnabled} title="Close"><FontAwesomeIcon size="lg" icon={faTimes} /></div>
        </div>
    );

    //------------------------------------------------------------------------------

}
