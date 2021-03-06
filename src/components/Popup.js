
//
import React from 'react';


//
import Scrollable from "react-scrollbars-custom";

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
                    <Scrollable>
                        <div className="popup-content-inner">
                            {props.children}
                        </div>
                    </Scrollable>
                </div>

                <div className="popup-footer">
                    <div className="popup-title">{props.title}</div>
                    <button className="btn">Close</button>
                </div>

            </div>
        </div>
    );

};