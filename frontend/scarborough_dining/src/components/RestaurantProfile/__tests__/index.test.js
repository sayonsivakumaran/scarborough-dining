import React from 'react';
import { shallow } from 'enzyme';
import RestaurantProfile from '../index';
import data from '../../../mock/restaurant.json';

describe('RestaurantProfile', () => {

    let wrapper, instance, restaurant, match;

    for (let i = 1; i <= data.length; i++) {

        match = {
            path: `/restaurants/${i}`,
            params: {id: `${i}`}
        };
        wrapper = shallow(<RestaurantProfile match={match}/>);
        instance = wrapper.instance();
        restaurant = data.find(restaurant => restaurant.id == instance.props.match.params.id);

        it(`renders name of restaurant ID ${i}`, () => {
            expect(wrapper.find('.restaurant-info h1').text()).toBe(restaurant.name);
        });

        it(`renders description of restaurant ID ${i}`, () => {
            expect(wrapper.find('.restaurant-info h2').text()).toBe(restaurant.description);
        });

        it(`renders address/phone of restaurant ID ${i}`, () => {
            expect(wrapper.find('.restaurant-info h3').text()).toBe(`${restaurant.address} | ${restaurant.phone}`);
        });
    }
});
