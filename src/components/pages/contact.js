import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contactPageImage from "../../../static/assets/images/layout-images/buildings.jpg";

export default class About extends Component {
    render() {
        return (
            <div className="common-page-wrapper">
                <div
                    className="left-column"
                    style={{
                        backgroundImage: `url(${contactPageImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                />

                <div className="right-column">
                    <div className="contact-item">
                        <FontAwesomeIcon icon="phone" className="contact-icon"/>
                        <div className="info">111-111-1111</div>
                    </div>
                    <div className="contact-item">
                        <FontAwesomeIcon icon="paper-plane" className="contact-icon"/>
                        <div className="info">email@something.com</div>
                    </div>
                    <div className="contact-item">
                        <FontAwesomeIcon icon="map-marked-alt" className="contact-icon"/>
                        <div className="info">Provo, UT</div>
                    </div>
                </div>
            </div>
        );
    }
}