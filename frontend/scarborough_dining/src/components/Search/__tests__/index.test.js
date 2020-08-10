import React from 'react';
import axios from 'axios';
import { shallow } from 'enzyme';
import SearchResults from '../searchResults';

jest.mock('axios');

describe('SearchResults', () => {

    let page, instance, mockResponse, mockRestaurant, match, mockQuery;

    mockRestaurant = {
        _id: "1",
        name: "restaurant",
        address: "address",
        longDescription: "desc",
        phoneNumber: "647",
        imageURLs: ["image"]
    }

    mockQuery = 'Subway';

    match = {
        path: `/restaurants/${mockQuery}`,
        params: {query: `${mockQuery}`}
    };

    mockResponse = {data: mockRestaurant};
    axios.get.mockImplementation(() => Promise.resolve().then(data => { return mockResponse}));

    const getRestaurantListSpy = jest.spyOn(SearchResults.prototype, 'getResults');
    const setStateSpy = jest.spyOn(SearchResults.prototype, 'setState');

    beforeEach(() => {
        page = shallow(<SearchResults match={match}/>);
        instance = page.instance();
    });

    //makes sure the inital states are right and the search parameter is correct
    describe('init', () => {
        it('should set state variables correctly and call getResults', () => {
            const getRestaurantListSpy = jest.spyOn(SearchResults.prototype, 'getResults');
            page = shallow(<SearchResults match={match}/>);
            instance = page.instance();
            
            expect(instance.state.results).toEqual([]);
            expect(instance.state.notFound).toEqual('');
            expect(instance.props.match.params.query).toEqual(`${mockQuery}`);
            expect(getRestaurantListSpy).toHaveBeenCalled();
        });
    });

    describe('getResults', () => {
        it('should set state to restaurant data', () => {
            expect(instance.state.results).toEqual(mockRestaurant);
            expect(instance.state.notFound).toEqual('Sorry, no results were found :(');
        });
    });
});