import React, { Component } from 'react';

import profileImg from "../../../static/assets/images/layout-images/square-rigged-ship.jpg";

export default class About extends Component {
    render() {
        return (
            <div className="common-page-wrapper">
                <div
                    className="left-column"
                    style={{
                        backgroundImage: `url(${profileImg})`,
                        backgroundSize: "cover",
                    }}
                />

                <div className="right-column">
                    <h1 className="layout-heading">Paige Crandall</h1>
                    <p className="layout-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p className="layout-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
            </div>
        );
    }
}