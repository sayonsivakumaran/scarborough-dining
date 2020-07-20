import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import Restaurant from '../index';


describe('<Restaurant />', () => {
    let page, instance, initializeRestaurantSpy, props;


    beforeEach(() => {
        props = {restaurant: {
            name: "testname",
            imageURLs: ["pic"],
            address: "address",
            description: "desc",
            _id: "id",
            ratings: []
        }};

        page = shallow(<Restaurant {...props} />);
        props = page.props();

        instance = page.instance();

    });

    describe('init', () => {
        it('should initialize state variables and call intialize variables', () => {

            expect(instance.state.name).toBe("testname");
            expect(instance.state.picture).toBe("pic");
            expect(instance.state.address).toBe("address");
            expect(instance.state.description).toBe("desc");
            expect(instance.state.id).toBe("id");
            expect(instance.state.rating).toEqual([]);

        });
    });

    describe('getRatings', () => {
        let ratings = [5,4,3,2];

        it('should average out ratings', () => { 
            expect(instance._getRatings(ratings).length).toBe(4);
        })

        it('should return empty message if given no ratings', () => {
            expect(instance._getRatings([]).length).toBe(1);
        });
    });
});