import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import ManageRestaurantInformation from '../index';

jest.mock('axios');

describe('<ManageRestaurantInformation />', () => {
    let page, instance;

    beforeEach(() => {
        page = shallow(<ManageRestaurantInformation />);
        instance = page.instance();
    });

    describe('_retreiveLogoImageURL', () => {
        it('should receive image URL when the logo image upload request is succesful', async () => {
            const mockResponse = {data: {result: {secure_url: 'URL'}}};
            axios.post.mockImplementationOnce(() => Promise.resolve().then(data => { return mockResponse}));
            const url = await instance._retrieveLogoImageURL('');
            expect(url).toEqual('URL');
        });

        it('should receive the appropriate error when the logo image upload promise is rejected', async () => {
            axios.post.mockImplementationOnce(() => Promise.reject('Error: 400'));
            const url = await instance._retrieveLogoImageURL('');
            expect(url).toEqual('Error: 400');
        });
    });

    describe('_retrieveMenuImageURLs', () => {
        it('should receive an array of image URLs when the menu item images upload request is succesful', async () => {
            const mockRequest = [
                {image: 'img1'},
                {image: 'img2'}
            ];
            axios.post.mockImplementationOnce(() => Promise.resolve({data: {result: {secure_url: 'URL1'}}}));
            axios.post.mockImplementationOnce(() => Promise.resolve({data: {result: {secure_url: 'URL2'}}}));
            const mockResponse = ['URL1', 'URL2'];
            const urls = await instance._retrieveMenuImageURLs(mockRequest);
            expect(urls).toEqual(mockResponse);
        });

        it('should receive an error if any of the image post request promises reject', async () => {
            const mockRequest = [
                {image: 'img1'},
                {image: 'img2'}
            ];
            axios.post.mockImplementationOnce(() => Promise.resolve({data: {result: {secure_url: 'URL1'}}}));
            axios.post.mockImplementationOnce(() => Promise.reject('Error: 400'));
            const response = await instance._retrieveMenuImageURLs(mockRequest);
            expect(response).toEqual('Error: 400');
        });
    });

    describe('_postMenuItemData', () => {
        it('should receive an array of messages if all menu items have been posted successfully', async () => {
            const mockRequest = [
                {item: 'item1'},
                {item: 'item2'}
            ];
            axios.post.mockImplementation(() => Promise.resolve('Success'));
            const mockResponse = ['Success', 'Success'];
            const response = await instance._postMenuItemData(mockRequest);
            expect(response).toEqual(mockResponse);
        });

        it('should receive an error if any of the item post request promises reject', async () => {
            const mockRequest = [
                {item: 'item1'},
                {item: 'item2'}
            ];
            axios.post.mockImplementationOnce(() => Promise.resolve('Success'));
            axios.post.mockImplementationOnce(() => Promise.reject('Error: 400'));
            const response = await instance._postMenuItemData(mockRequest);
            expect(response).toEqual('Error: 400');
        });
    });
});