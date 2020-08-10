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

    beforeEach(() => {
        component = shallow(<MenuItem menuItem={mockItem} />);
        instance = component.instance();
    });

    describe('onQuantityChange', () => {
        it('should change the state of the component so that the total selected matches the value in the event', () => {
            const req = {target: {value: 3}};
            req.preventDefault = jest.fn();
            instance.onQuantityChange(req);
            expect(instance.state.totalSelected).toEqual(3);
        });
    });

    describe('close', () => {
        it('should receive image URL when the logo image upload request is succesful', () => {
            instance.close();
            expect(instance.state.totalSelected).toEqual(0);
        });
    });
});