import React from 'react';
import AccountCreation from '../index';
import axios from 'axios';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router'


jest.mock('axios');

describe('<AccountCreation />', () => {
    let page, instance, props;


    beforeEach(() => {
        props = {userType : "user"};

        page = shallow(<AccountCreation {...props}/>);
        instance = page.instance();
    });

    describe('render', () => {
        it('should render user form given props.userType is user', () => {
            expect(page.find('.formStyle').get(0)).toBeDefined();
            expect(page.find('.formContainer').get(0)).not.toBeDefined();
        });

        it('should render user and restaurant form given props.userType is not user', () => {
            let restaurantProps = {userType : "restaurant"};

            page = shallow(<AccountCreation {...restaurantProps} />);
            instance = page.instance();

            expect(page.find('.formContainer').get(0)).toBeDefined();
        });

        it('should not redirect to home page if redirect is false', () => {
            expect(page.find(Redirect)).toHaveLength(0);
        });

        it('should redirect to home page if redirect is true', () => {
            instance.setState({redirect: true});
            expect(page.find(Redirect)).toHaveLength(1);
        });
    })

    describe('_uploadImageURL', () => {
        it('should receive image URL when the image upload request is succesful', async () => {
            const mockResponse = {data: {result: {secure_url: 'URL'}}};
            axios.post.mockImplementationOnce(() => Promise.resolve().then(data => { return mockResponse}));
            const url = await instance._uploadImageURL('');
            expect(url).toEqual('URL');
        });

        it('should receive the appropriate error when the image upload promise is rejected', async () => {
            axios.post.mockImplementationOnce(() => Promise.reject('Error: 400'));
            const url = await instance._uploadImageURL('');
            expect(url).toEqual('Error: 400');
        });
    });
});