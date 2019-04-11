import React, { Component, Fragment } from "react" ;
import Logo from './logo';
import { ACCESS_TOKEN } from '../constant';
import SearchResults from './searchResults';
import { FavouriteLink } from './favouriteLink';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: '',
            isFetched: false
        };
    }

    getPlaceResults(searchQuery) {
        fetch(`https://graph.facebook.com/v3.2/search?type=place&q=${searchQuery}&fields=name,overall_star_rating,rating_count,location,picture&access_token=${ACCESS_TOKEN}`)
        .then(response => {
            return response.json();
        })
        .then(response => {
            this.setState({
                isFetched: true,
                placesList: response.data
            })
        });

        this.setState({
            isFetched: false
        })
    }

    handleChange(searchStr) {
        this.setState({
            searchString: searchStr,
        });

        this.getPlaceResults(searchStr);
    }

    render() {
        const isFetched = this.state.isFetched;
        const placesList = this.state.placesList;

        return (
            <Fragment>
                <header className="main-head">
                    <Logo />
                    <FavouriteLink />
                </header>
                <div className="search-container">
                    <div className="search-header">
                        <div className="search-title">Search Places</div>
                        <input type="text" placeholder="Enter a search term" className="search-input"
                            onChange={e => this.handleChange(e.target.value)}
                            value={this.state.searchString}
                            autoFocus
                        />
                    </div>
                    <section className="search-content">
                        {placesList
                            ? isFetched && placesList.length > 0 
                                ? (
                                    <div className="results-list">
                                        {placesList.map((item) => 
                                            <SearchResults itemData={item} key={item.id} history={this.props.history}/>
                                        )}
                                    </div>
                                )
                                : (
                                    isFetched && !placesList.length
                                        ? <h2>No Results</h2>
                                        : (
                                            !isFetched
                                            ? <h3>Loading...</h3>
                                            : null
                                        )
                                )
                            : null 
                        }
                    </section>
                </div>
            </Fragment>
        )
    }
}