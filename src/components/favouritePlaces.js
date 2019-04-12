import React, { Component, Fragment } from "react" ;
import Logo from './logo';
import ls from 'local-storage';
import SearchResults from './searchResults';

export default class FavouritePlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: ''
        }
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    handleBackClick() {
        this.props.history.push('/');
    }

    componentDidMount() {
        this.setState({
            itemList: ls.get('myfavourites')
        })
    }

    render() {
        const itemsList = this.state.itemList;
        return (
            <Fragment>
                <header className="main-head">
                    <Logo />
                    <div className="go-back" onClick={this.handleBackClick}>Back</div>
                </header>
                <div className="fav-wrap">My Favourite Places</div>
                <section className="results-list fav-content">
                {
                    itemsList ? (
                        Object.keys(itemsList).map((key) => (
                            <SearchResults itemData={itemsList[key]} key={itemsList[key].id} history={this.props.history}/>
                        ))
                    ) : (
                        <div>No Favourites to show!</div>
                    )
                }
                </section>
            </Fragment>
        )
    }
}