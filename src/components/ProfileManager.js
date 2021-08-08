
//
import React from 'react';

//
import { useProfileState } from '../context/ProfileContext';

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
    const profiles = useProfileState();

    //
    return (
        <div className="profiles">
            {profiles.getAllProfiles().map((profile) => <ProfileItem key={profile.id} profile={profile} />)}
        </div>
    );
}

//
const ProfileItem = (props) => {

    //
    // const dispatch = useProfileDispatch();

    //
    const [editEnabled, setEditEnabled] = React.useState(false);
    const toggleEditEnabled = () => setEditEnabled(!editEnabled);

    //
    const handleSubmit = (values) => {
        //dispatch({'type': 'update', 'profile' : { ...props.profile, ...values }});
    };

    //
    if (!editEnabled) {
        return (
            <div className="profile" title={props.profile.name}>
                <div>{props.profile.name}</div>
                <div className="control-button" onClick={toggleEditEnabled} title="Edit"><FontAwesomeIcon size="lg" icon={faPencilAlt} /></div>
            </div>
        );
    }

    //
    return (
        <div className="profile" title={props.profile.name}>
            <div>
                <Form initialValues={props.profile} onSubmit={handleSubmit}>
                    <Field label="Name" type="text" name="name" ></Field>
                    <Field label="Filter" type="text" name="filter"></Field>
                    <Submit />
                </Form>
            </div>
            <div className="control-button" onClick={toggleEditEnabled} title="Close"><FontAwesomeIcon size="lg" icon={faTimes} /></div>
        </div>
    );

    //------------------------------------------------------------------------------

}
