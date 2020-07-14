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
        it('should receive image URL when the image upload request is succesful', async () => {
            const mockResponse = {data: {result: {secure_url: 'URL'}}};
            axios.post.mockImplementationOnce(() => Promise.resolve().then(data => { return mockResponse}));
            const url = await instance._retrieveLogoImageURL('');
            expect(url).toEqual('URL');
        });

        it('should receive the appropriate error when the image upload promise is rejected', async () => {
            axios.post.mockImplementationOnce(() => Promise.reject('Error: 400'));
            const url = await instance._retrieveLogoImageURL('');
            expect(url).toEqual('Error: 400');
        });
    });
});