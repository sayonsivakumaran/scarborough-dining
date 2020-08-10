import React from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import RestaurantVerification from "../index";

jest.mock('axios');

/**
 * Test suite for RestaurantVerification page
 */
describe('<RestaurantVerification  />', () => {

    let page, instance, mockResponse, mockRestaurants, mockOwner, resultData;
    mockRestaurants = [
        {
            _id: "1",
            name: "restaurant",
            address: "address",
            city: "city",
            postalCode : "postalCode",
            ownerID: "id",
            phoneNumber: "testPhone"
        }
    ]
    mockOwner = { data : {
            id: "id",
            firstName: "testName",
            lastName: "last",
            email: "testEmail",
        }
    }

    let owner = mockOwner.data;
    resultData = [
        {
            _id: "1",
            name: "restaurant",
            address: "address",
            city: "city",
            postalCode : "postalCode",
            ownerID: "id",
            phoneNumber: "testPhone",
            owner
        }
    ]
    mockResponse = {data: mockRestaurants};

    axios.get.mockImplementation((url) => {
        if (url === '/restaurants/unverified') {
            return Promise.resolve().then(data => { return mockResponse});
        } else {
            return Promise.resolve().then(data => { return mockOwner});
        }
    });

    const getUnregistedRestaurantsSpy = jest.spyOn(RestaurantVerification.prototype, '_getUnregistedRestaurants');

    beforeEach(() => {
        page = shallow(<RestaurantVerification />);
        instance = page.instance();
    });

    /**
     * Test if constructor sets default state variables
     */
    describe('constructor', () => {
        it('should set state variables correctly', () => {            
            expect(instance.state.requestedRestaurants).toEqual([]);
            expect(instance.state.totalRequestedRestaurants).toBe(0);
        });
    });

    /**
     * Test componentDidMount should call _getUnregistedRestaurants method
     */
    describe('componentDidMount', () => {
        it('should call _getUnregistedRestaurants', () => {
            expect(getUnregistedRestaurantsSpy).toHaveBeenCalled();
        })
    });

    /**
     * Tests the data returned from axios and appends specific owner data to restaurants
     */
    describe('_getUnregistedRestaurants', () => {
        it('should get restaurant and owner data from axios and set in state', async () => {
            await instance._getUnregistedRestaurants();
            expect(instance.state.requestedRestaurants).toEqual(resultData);
            expect(instance.state.totalRequestedRestaurants).toBe(1);
        })
    });

    /**
     * Tests _getRestaurantElement method returns proper table rows
     */
    describe('_getRestaurantElement', () => {
        it('should return proper table row for render', async () => {
            expect(page.find('.empty-message').text()).toBe("No requested restaurants");
            await instance._getUnregistedRestaurants();
            page.update();

            let rows = page.find('.unverified-restaurant-row');

            expect(page.find('.table').text()).toBeDefined();
            expect(rows.length).toBe(1);

            const firstRowColumns = rows.first().find('td').map(column => column.text())
            expect(firstRowColumns.length).toBe(8);

            expect(firstRowColumns[0]).toBe('restaurant')
            expect(firstRowColumns[1]).toBe('address')
            expect(firstRowColumns[2]).toBe('city')
            expect(firstRowColumns[3]).toBe('postalCode')
            expect(firstRowColumns[4]).toBe('testPhone')
            expect(firstRowColumns[5]).toBe('testName last')
        });
    });

    /**
     * Test component renders correct table or empty message based on totalRequestedRestaurants
     */
    describe('render', () => {
        it('should render empty message when totalRequestedRestaurants is empty', () => {
            instance.setState({
                totalRequestedRestaurants: 0
            })
            page.update();
            expect(page.find('.empty-message').text()).toBe("No requested restaurants");
        });

        it('should render table when totalRequestedRestaurants is not empty', () => {
            instance.setState({
                totalRequestedRestaurants: 1
            })
            page.update();
            expect(page.find('.t-header').length).toBe(1);
        });
    })

});