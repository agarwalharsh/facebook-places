import React, { Component } from "react" ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ls from 'local-storage';

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        console.log('My list props-', props);
        this.savedFavs = ls.get('myfavourites');
        this.state = {
            isFav: this.savedFavs && this.savedFavs[props.itemData.id] ? true : false
        }
        this.onFavClick = this.onFavClick.bind(this);
    }

    selectPlace(event, placeId) {
        event.preventDefault();
        console.log('Propsss', this.props);
        this.props.history.push(`/detail/${placeId}`);
    }

    onFavClick(event) {
        event.stopPropagation();
        const itemId  = this.props.itemData.id;
        let mySavedFavs = ls.get('myfavourites') || {};

        if (this.state.isFav) {
            delete mySavedFavs[itemId];
            ls.set('myfavourites', {...mySavedFavs});
        } else {
            ls.set('myfavourites', {...mySavedFavs, [itemId]: this.props.itemData});
        }

        this.setState((state) => ({
            isFav: !state.isFav
        }));
    }

    render() {
        const item = this.props.itemData;
        console.log(this.props);

        return (
            <div className="result-item" onClick={(e) => this.selectPlace(e, item.id)}>
                <span className="place-logo">
                    <img className="place-img" src={item.picture.data.url} alt="placeLogo"/>
                </span>
                <div className="place-info-wrap">
                    <div className="place-name">
                        {item.name}
                    </div>
                    <div className="place-rating-detail">
                        <span className="rating-score">{item.overall_star_rating ? item.overall_star_rating : "NEW" }</span>
                        <span className="rating-count">{item.rating_count ? `(${item.rating_count})` : ''}</span>
                    </div>
                    <div className="place-location">
                        <span className="place-city">{item.location.city}, </span>
                        <span className="place-country">{item.location.country}</span>
                    </div>
                </div>
                <div className={"favourite-place" + (this.state.isFav ? ' selected' : '')} onClick={this.onFavClick}>
                    <FontAwesomeIcon icon="star" />
                </div>
            </div>
        )
    }
}