import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import Dashboard from './dashboard';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe('On entering search value', function() {
    sinon.stub(window, 'fetch');

    window.fetch.returns(Promise.resolve(
        new Promise((resolve, reject) => {
            resolve({
                status: 200,
                ok: true,
                json: () => new Promise((resolve, reject) => {
                    resolve({
                        data: [
                            {
                                "id": 234567,
                                "name": 'Place 1'
                            },
                            {
                                "id": 127474,
                                "name": 'Place 2'
                            }
                        ]
                    });
                })
            });
        })
    ));

    const asyncFlush = () => new Promise(resolve => setTimeout(resolve, 0));

    it('should render items', async () => {
        const wrapper = shallow(<Dashboard />);

        expect(wrapper.find('.search-input').length).toEqual(1);
        expect(wrapper.state('placesList').length).toEqual(0);

        wrapper.find('.search-input').simulate('change', { target: { value: 'Tip' } });

        await asyncFlush();
        wrapper.update();
        expect(wrapper.state('placesList').length).toEqual(2);
    })
})