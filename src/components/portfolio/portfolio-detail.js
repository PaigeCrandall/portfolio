import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class PortfolioDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portfolioItem: {}
        }
    }

    componentWillMount() {
        this.getPortfolioItem()
    }

    getPortfolioItem() {
        axios
        .get(
            `https://paigecrandall.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`,
            { withCredentials: true }
        ).then(response => {
            this.setState({
                portfolioItem: response.data.portfolio_item
            });
        }).catch(error => {
            console.log('getPortfolioItem error', error);
        });
    }

    render() {
        const {
            name,
            description,
            category,
            url,
            banner_image_url,
            thumb_image_url,
            logo_url
        } = this.state.portfolioItem;

        const bannerStyles = {
            backgroundImage: `url(${banner_image_url})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        }

        const logoStyles = {
            width: '200px'
        }

        return (
            <div className="portfolio-detail-wrapper">
                <Link exact="true" to="/" className="back-arrow">
                        <FontAwesomeIcon icon="arrow-left"/>
                </Link>
                <div className="banner" style={bannerStyles}>
                    <img src={logo_url} style={logoStyles}/>
                </div>
                <div className="portfolio-detail-description-wrapper">
                    <div className="description">{description}</div>
                </div>
                <div className="site-link-wrapper">
                    <a href={url} className="site-link" target="_blank">
                        Visit {name}
                    </a>
                </div>
            </div>
        );
    }
}