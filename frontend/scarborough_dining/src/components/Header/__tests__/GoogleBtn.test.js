import React, { Component } from 'react';
import { shallow } from 'enzyme';
import * as axios from 'axios';
import GoogleBtn from '../GoogleBtn';
import { GoogleLogout, GoogleLogin } from 'react-google-login';


// Mock up all top level functions: GET, PUT, DELETE, POST
jest.mock('axios');

describe('<GoogleButton />', () => {
    let googleBtn;

    googleBtn = shallow(<GoogleBtn />);
    //instance = wrapper.instance();

    it('Should render the log out button when state.isLogined i is true', () => {
        googleBtn.setState({ isLogined: true });
        expect(googleBtn.find(GoogleLogout).length).toBe(1);
    });

    it('Should render the log in button when state.isLogined i is false', () => {
        googleBtn.setState({ isLogined: false });
        expect(googleBtn.find(GoogleLogin).length).toBe(1);
    });

})

describe('axios response', () => {

    test('test good response', () => {
        axios.post.mockImplementation(() => Promise.resolve({ status: 200, data: {}}));
    });
    
    test('test bad response', () => {
        axios.post.mockImplementation(() => Promise.reject({ status: 404, data: {}}));
    });
})
