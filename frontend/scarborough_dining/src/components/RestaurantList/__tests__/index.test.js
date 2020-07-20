import React from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import RestaurantList from "../index";

jest.mock('axios');

describe('<RestaurantList />', () => {

    let page, instance, mockResponse, mockRestaurants;
    mockRestaurants = [
        {
            id: "1",
            name: "restaurant"
        }
    ]
    mockResponse = {data: mockRestaurants};
    axios.get.mockImplementation(() => Promise.resolve().then(data => { return mockResponse}));

    beforeEach(() => {
        page = shallow(<RestaurantList />);
        instance = page.instance();
    });

    describe('init', () => {
        it('should set state variables correctly and call _getRestaurantList', () => {
            const getRestaurantListSpy = jest.spyOn(RestaurantList.prototype, '_getRestaurantList');
            page = shallow(<RestaurantList />);
            instance = page.instance();
            
            expect(instance.state.restaurants).toEqual([]);
            expect(instance.state.totalRestaurants).toBe(0);
            expect(getRestaurantListSpy).toHaveBeenCalled();
        });
    });

    describe('_getRestaurantList', () => {
        it('should set state to restaurant data', () => {
            expect(instance.state.restaurants).toEqual(mockRestaurants);
            expect(instance.state.totalRestaurants).toEqual(mockRestaurants.length);
        });
    });
});