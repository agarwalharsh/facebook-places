import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './dashboard'
import PlaceDetails from './placeDetail';
import FavouritePlaces from './favouritePlaces';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import '../css/styles.css'

library.add(faStar);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route 
            exact 
            path="/" 
            render={(props) => (
              <Dashboard {...props}/>
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
          <Route 
            render={() => (
              <h1>Page Not Found!</h1>
            )
            }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
