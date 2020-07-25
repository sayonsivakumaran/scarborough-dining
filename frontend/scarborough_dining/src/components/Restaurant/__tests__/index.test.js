import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import Restaurant from '../index';


describe('<Restaurant />', () => {
    let page, instance, initializeRestaurantSpy, props;


    beforeEach(() => {
        props = {restaurant: {
            name: "testname",
            logoURL: "pic",
            address: "address",
            description: "desc",
            _id: "id"
        }};

        page = shallow(<Restaurant {...props} />);
        props = page.props();

        instance = page.instance();

    });

    describe('constructor', () => {
        it('should initialize state variables and call intialize variables', () => {

            expect(instance.state.name).toBe("testname");
            expect(instance.state.picture).toBe("pic");
            expect(instance.state.address).toBe("address");
            expect(instance.state.description).toBe("desc");
            expect(instance.state.id).toBe("id");

        });
    });
});