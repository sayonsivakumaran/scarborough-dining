import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import ShoppingCart from '../index';

jest.mock('axios');

describe('<ShoppingCart />', () => {
    let component, instance;
    let mockItem = [{
        name: 'Item',
        price: 3.99,
        imageURL: '',
        description: '',
        cuisineTypes: [],
        restaurantID: '1'
    }];

    describe('componentDidMount', () => {
        beforeEach(() => {
            component = shallow(<ShoppingCart userGoogleId='1234567890' />);
            instance = component.instance();
        });

        it('should change the state of the component so that the total selected matches the value in the event on success', async () => {
            axios.get.mockImplementationOnce(() => Promise.resolve({data: mockItem}));
            await instance.componentDidMount();
            
            expect(instance.state.shoppingCart).toEqual(mockItem);
            expect(instance.state.totalItems).toEqual(1);
        });

        it('should not change the state of the component on failure', async () => {
            axios.get.mockImplementationOnce(() => Promise.reject('Error: 404'));
            await instance.componentDidMount();
            expect(instance.state.shoppingCart).toEqual([]);
            expect(instance.state.totalItems).toEqual(0);
        });
    });

    describe('_removeMenuItems', () => {
        beforeEach(() => {
            component = shallow(<ShoppingCart userGoogleId='1234567890' />);
            instance = component.instance();
        });

        it('should update the state so that the state is set to the new response', async () => {
            axios.post.mockImplementationOnce(() => Promise.resolve({data: mockItem}));
            await instance._removeMenuItems('32');
            
            expect(instance.state.shoppingCart).toEqual(mockItem);
            expect(instance.state.totalItems).toEqual(1);
        });

        it('should not change the state of the component on failure', async () => {
            axios.post.mockImplementationOnce(() => Promise.reject('Error: 404'));
            await instance._removeMenuItems('34');
            expect(instance.state.shoppingCart).toEqual([]);
            expect(instance.state.totalItems).toEqual(0);
        });
    });

    describe('_postShoppingCartData', () => {
        beforeEach(() => {
            component = shallow(<ShoppingCart userGoogleId='1234567890' />);
            instance = component.instance();
        });

        it('should update the state so that the state is set to the newly posted data and appropriate modal message', async () => {
            let mockResponse = mockItem.concat(mockItem);
            axios.post.mockImplementationOnce(() => Promise.resolve({}));
            axios.post.mockImplementationOnce(() => Promise.resolve({data: mockResponse}));
            await instance._postShoppingCartData(mockItem, '3453');
            
            expect(instance.state.shoppingCart).toEqual(mockResponse);
            expect(instance.state.totalItems).toEqual(2);
            expect(instance.state.submissionMessage).toEqual('Your items have succesfully been submitted!');
        });

        it('should update the state so that the shopping cart hasn\'t been changed and appropriate modal message', async () => {
            axios.post.mockImplementationOnce(() => Promise.resolve({}));
            axios.post.mockImplementationOnce(() => Promise.reject('Error: 404'));
            await instance._postShoppingCartData(mockItem, '34');
            expect(instance.state.shoppingCart).toEqual([]);
            expect(instance.state.totalItems).toEqual(0);
        });
    });
});