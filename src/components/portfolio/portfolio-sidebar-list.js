import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PortfolioSidebarList = props => {

    const portfolioList = props.data.map(item => {
        return (
            <div className="portfolio-item-thumb" key={item.id}>
                <div className="portfolio-thumb-image">
                    <img src={item.thumb_image_url} />
                </div>
                <div className="text-content">
                    <div className="title">{item.name}</div>

                    <div className="actions">
                        <a className="action-icon teal-hover" onClick={() => props.handleEditClick(item)}>
                            <FontAwesomeIcon icon="pen-to-square" />
                        </a>
                        <a className="action-icon red-hover" onClick={() => props.handleDeleteClick(item)}>
                            <FontAwesomeIcon icon="trash" />
                        </a>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="portfolio-sidebar-list-wrapper">
            {portfolioList}

        </div>
    );
}

export default PortfolioSidebarList;