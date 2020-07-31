import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import Restaurant from '../index';

/**
 * Test suite for the Restaurant component
 */
describe('<Restaurant />', () => {
    let page, instance, props, cuisineTypes;

    beforeEach(() => {
        cuisineTypes = ["fast food", "vegan"];
        props = {restaurant: {
            name: "testname",
            logoURL: "pic",
            address: "address",
            description: "desc",
            cuisineTypes: cuisineTypes,
            yearEstablished: "1900",
            _id: "id"
        }};

        page = shallow(<Restaurant {...props} />);
        props = page.props();

        instance = page.instance();

    });

    /**
     * Test constructor initialize state variables
     */
    describe('constructor', () => {
        it('should initialize state variables', () => {
            expect(instance.state.name).toBe("testname");
            expect(instance.state.picture).toBe("pic");
            expect(instance.state.address).toBe("address");
            expect(instance.state.description).toBe("desc");
            expect(instance.state.cuisineTypes).toBe(cuisineTypes)
            expect(instance.state.id).toBe("id");
        });
    });

    /**
     * Tests component renders proper content
     */
    describe('render', () => {
        it('should render contents in card', () => {
            expect(page.find('.card-img-top').text()).toBeDefined();
            expect(page.find('.card-title').text()).toBe("testname");
            expect(page.find('.address').text()).toBe("address");
            expect(page.find('.card-text').at(1).text()).toBe("desc");
            expect(page.find('.categories').text()).toBe("fast foodvegan");
        });

        it('should render yearEstablished text if it exists', () => {
            instance.setState({
                yearEstablished: "1900"
            })
            expect(page.find(".list-group-item").text()).toBe("Since 1900")
        });

        it('should not render yearEstablished text if it does exists', () => {
            instance.setState({
                yearEstablished: undefined
            })
            expect(page.find(".list-group-item").text()).toBe("")
        });
    })
});