
//
import React from 'react';

//
export default (props) => {

    //
    if (props.visible != true) {
        return null;
    }

    //
    return (
        <div className="popup-container">
            <div className="popup">

                <div className="popup-content">
                    {props.children}
                </div>

                <div className="popup-footer">
                    <div className="popup-title">{props.title}</div>
                    <button className="btn">Close</button>
                </div>

            </div>
        </div>
    );

};