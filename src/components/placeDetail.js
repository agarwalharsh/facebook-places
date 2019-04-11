import React, { Component, Fragment } from "react" ;
import Logo from './logo';
import { ACCESS_TOKEN } from '../constant';
import { FavouriteLink } from './favouriteLink';

export default class PlaceDetails extends Component {
    constructor(props) {
        super(props);
        console.log('Cons props- ', props);
        this.state = {
            detailData: ''
        }
    }

    componentDidMount() {
        const placeId = this.props.match.params.id;

        fetch(`https://graph.facebook.com/v3.2/${placeId}?fields=cover,name,overall_star_rating,rating_count,location,about,checkins,phone,restaurant_specialties&access_token=${ACCESS_TOKEN}`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            console.log('Detail Response- ', response);
            this.setState({
                detailData: response
            })
        });
    }

    render() {
        const detailData = this.state.detailData;
        return (
            <Fragment>
                <header className="main-head">
                    <Logo />
                    <FavouriteLink />
                </header>
                {
                    detailData &&
                    <div className="detail-wrap">
                        <div className="detail-container">
                            <div className="cover-photo-wrap">
                                <img className="cover-img" src={detailData.cover && detailData.cover.source} alt="cover-pic"/>
                            </div>
                            <div className="place-detail">
                                <div className="basic-detail">
                                    <div className="place-name-detail">
                                        <div className="place-name-text">{detailData.name}</div>
                                        <div className="place-location-detail">{detailData.location.city}, {detailData.location.country}</div>
                                    </div>
                                    <div>
                                        {
                                            detailData.overall_star_rating ? (
                                                <div className="rating-score">{detailData.overall_star_rating}<span className="total-score">/5</span></div>
                                            ) : (
                                                <div className="rating-score">NEW</div>
                                            )
                                        }
                                        { detailData.rating_count ? 
                                            <div className="rating-votes">{detailData.rating_count} votes</div> : null
                                        }
                                    </div>
                                </div>
                                {
                                    detailData.about && <div className="place-about-detail">{detailData.about}</div>
                                }
                                <div className="place-contact-details">
                                    <div className="place-phone-detail">
                                        <div className="place-phone-text">Phone Number</div>
                                        <div className="place-phone-number">
                                        {
                                            detailData.phone ? detailData.phone : 'Not Available!'
                                        }
                                        </div>
                                    </div>
                                    <div className="place-address-detail">
                                        <div className="place-address-text">Address</div>
                                        <div className="place-address-number">
                                        {
                                            detailData.single_line_address ? detailData.single_line_address : 'Not Available!'
                                        }
                                        </div>
                                    </div>
                                    <div className="place-link-detail">
                                        <div className="place-link-fb">Fb Page</div>
                                        {
                                            detailData.link ? (
                                                <a className="place-link" href={detailData.link}>Click Here</a>
                                            ) : (
                                                <div>Not Available!</div>
                                            )
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </Fragment>
        )
    }
}