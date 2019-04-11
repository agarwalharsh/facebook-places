import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/dashboard'
import PlaceDetails from './components/placeDetail';
import FavouritePlaces from './components/favouriteDetails';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import './css/styles.css'

library.add(faStar);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route 
            exact 
            path="/" 
            render={() => (
              <Dashboard />
            )
            }
          />
          <Route 
            exact 
            path="/detail/:id" 
            render={(props) => (
              <PlaceDetails {...props}/>
            )
            }
          />
          <Route 
            exact 
            path="/favourites" 
            render={(props) => (
              <FavouritePlaces {...props}/>
            )
            }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
