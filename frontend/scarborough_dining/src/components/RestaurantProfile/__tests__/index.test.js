import React from 'react';
import { shallow } from 'enzyme';
import RestaurantProfile from '../index';
import data from '../../../mock/restaurant.json';
import axios from 'axios';

jest.mock('axios');

describe('RestaurantProfile', () => {

    let page, instance, mockResponse, mockRestaurant, match;

    mockRestaurant = {
        _id: "1",
        name: "restaurant",
        address: "address",
        longDescription: "desc",
        phoneNumber: "647",
        imageURLs: ["image"]
    }


    match = {
        path: `/restaurants/${mockRestaurant._id}`,
        params: {id: `${mockRestaurant._id}`}
    };

    mockResponse = {data: mockRestaurant};
    axios.get.mockImplementation(() => Promise.resolve().then(data => { return mockResponse}));

    const getRestaurantListSpy = jest.spyOn(RestaurantProfile.prototype, '_getRestaurantInfo');

    beforeEach(() => {
        page = shallow(<RestaurantProfile match={match}/>);
        instance = page.instance();
    });

    describe('constructor', () => {
        it('should set state variables correctly and call _getRestaurantList', () => {            
            expect(instance.state.name).toEqual(mockRestaurant.name);
            expect(instance.state.id).toEqual(mockRestaurant._id);
            expect(instance.state.address).toEqual(mockRestaurant.address);
            expect(instance.state.description).toEqual(mockRestaurant.longDescription);
            expect(instance.state.phoneNumber).toEqual(mockRestaurant.phoneNumber);
            expect(getRestaurantListSpy).toHaveBeenCalledWith(mockRestaurant._id);
        });

        it(`renders name of restaurant`, () => {
            expect(page.find('.restaurant-title').text()).toBe(mockRestaurant.name);
        });

        it(`renders description of restaurant`, () => {
            expect(page.find('.text').text()).toBe(mockRestaurant.longDescription);
        });

        it(`renders restaurant video`, () => {
            expect(page.find('.videoPlayer').text()).toBeDefined();
        });
    });
});
