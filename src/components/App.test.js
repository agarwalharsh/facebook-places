import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow } from 'enzyme';
import { Route } from 'react-router';
import App from './App';
import Dashboard from './dashboard';
import PlaceDetails from './placeDetail';
import FavouritePlaces from './favouritePlaces';

Enzyme.configure({ adapter: new Adapter() });

describe('When navigating route', function(){
    it('should render correct routes', function() {
        const wrapper = shallow(<App />);
        const pathMap = wrapper.find(Route).reduce((map, route) => {
            const routeProps = route.props();
            map[routeProps.path] = routeProps.render();
            return map;
        }, {});

        expect(pathMap['/']).toEqual(<Dashboard />);
        expect(pathMap['/detail/:id']).toEqual(<PlaceDetails />);
        expect(pathMap['/favourites']).toEqual(<FavouritePlaces />);
    })
})


