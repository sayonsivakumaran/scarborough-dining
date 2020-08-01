import React from 'react';
import { shallow } from 'enzyme';
import RestaurantProfile from '../index';
import axios from 'axios';

jest.mock('axios');

/**
 * Test suite for the RestaurantProfile component
 */
describe('RestaurantProfile', () => {

    let page, instance, mockResponse, mockRestaurant, match, event;

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
    const setStateSpy = jest.spyOn(RestaurantProfile.prototype, 'setState');

    beforeEach(() => {
        page = shallow(<RestaurantProfile match={match}/>);
        instance = page.instance();
    });

    /**
     * Test that the appropriate elements are being rendered
     */
    describe('render', () => {
        it('renders only info tab', () => {
            expect(page.find(".active").text()).toBe("Info");
        })

        it(`renders name of restaurant`, () => {
            expect(page.find('.restaurant-title').text()).toBe(mockRestaurant.name);
        });

        it(`renders address and phone number of restaurant`, () => {
            expect(page.find('.address').text()).toBe(mockRestaurant.address);
            expect(page.find('.phone').text()).toBe(mockRestaurant.phoneNumber);
        });

        it(`renders description of restaurant`, () => {
            expect(page.find('.text').text()).toBe(mockRestaurant.longDescription);
        });

        it(`renders restaurant video`, () => {
            instance.setState({
                videoUrl: "url"
            });
            page.update();
            expect(page.find('.videoPlayer').text()).toBeDefined();
        });

        it('renders active class on menu tab and menu div given button click', () => {
            event = {
                target: {name: "menu"}
            }
            page.find('.nav-link').at(0).simulate('click', event);
            expect(page.find(".active").text()).toBe("Menu");
            expect(page.find(".menu").text()).toBe("Menu");
        });

        it('renders active class on announcement tab and announcement div given button click', () => {
            event = {
                target: {name: "announcements"}
            }
            page.find('.nav-link').at(0).simulate('click', event);
            expect(page.find(".active").text()).toBe("Announcements");
            expect(page.find(".announcements").text()).toBe("Announcements");
        });

        it('should not render video if videoUrl is not defined', () => {
            instance.setState({
                videoUrl: undefined
            })
            expect(page.find('videoPlayer').exists()).not.toBeTruthy();
        })

    });

    /**
     * Tests the constructor initliazes state variables and makes call to get data
     */
    describe('constructor', () => {
        it('should set state variables correctly and call _getRestaurantList', () => {            
            expect(instance.state.name).toEqual(mockRestaurant.name);
            expect(instance.state.id).toEqual(mockRestaurant._id);
            expect(instance.state.address).toEqual(mockRestaurant.address);
            expect(instance.state.description).toEqual(mockRestaurant.longDescription);
            expect(instance.state.phoneNumber).toEqual(mockRestaurant.phoneNumber);
            expect(instance.state.activeTab).toEqual("info");
            expect(getRestaurantListSpy).toHaveBeenCalledWith(mockRestaurant._id);
        });
    });
    
    /**
     * Tests _setTab changes to correct active tab
     */
    describe('_setTab', () => {
        it('should set activeTab on button click', () => {
            event = {
                target: {name: "menu"}
            }
            expect(instance.state.activeTab).toEqual("info");
            page.find('.nav-link').at(0).simulate('click', event);

            expect(setStateSpy).toHaveBeenCalledWith({
                activeTab: event.target.name
            });
            expect(instance.state.activeTab).toEqual("menu");
        })
    })
});
