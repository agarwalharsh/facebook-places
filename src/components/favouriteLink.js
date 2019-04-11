import React from "react" ;
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const FavouriteLink = withRouter(({ history }) => (
    <div className="favourites-link" onClick={() => { history.push('/favourites') }}>
        My Favourites <FontAwesomeIcon icon="star" />
    </div>
));