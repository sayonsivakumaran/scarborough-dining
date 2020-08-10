import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import MenuItem from '../index';

jest.mock('axios');

describe('<MenuItem />', () => {
    let component, instance;
    let mockItem = {
        name: 'Item',
        price: 3.99,
        imageURL: '',
        description: '',
        cuisineTypes: []
    }

    describe('onQuantityChange', () => {
        beforeEach(() => {
            component = shallow(<MenuItem menuItem={mockItem} />);
            instance = component.instance();
        });

        it('should change the state of the component so that the total selected matches the value in the event', () => {
            const req = {target: {value: 3}};
            req.preventDefault = jest.fn();
            instance.onQuantityChange(req);
            expect(instance.state.totalSelected).toEqual(3);
        });
    });

    describe('close', () => {
        beforeEach(() => {
            component = shallow(<MenuItem menuItem={mockItem} />);
            instance = component.instance();
        });

        it('should receive image URL when the logo image upload request is succesful', () => {
            instance.close();
            expect(instance.state.totalSelected).toEqual(0);
        });
    });

    describe('addToShoppingCart', () => {
        beforeEach(() => {
            component = shallow(<MenuItem menuItem={mockItem} />);
            instance = component.instance();
        });

        it('should not send a request if there are no selected items', async () => {
            axios.post.mockImplementation(() => Promise.resolve());
            instance.setState({
                totalSelected: 0
            });
            await instance.addToShoppingCart();
            expect(axios.post).not.toHaveBeenCalled();
        });

        it('should send a request request if there are items selected', async () => {
            axios.post.mockImplementation(() => Promise.resolve());
            instance.setState({
                totalSelected: 1
            });
            await instance.addToShoppingCart();
            expect(axios.post).toHaveBeenCalled();
        });
    });
});