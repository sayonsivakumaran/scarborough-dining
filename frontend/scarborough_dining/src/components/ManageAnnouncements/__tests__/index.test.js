import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import ManageAnnouncements from '../index';

jest.mock('axios');

describe('<ManageRestaurantInformation />', () => {
    let page, instance;

    beforeEach(() => {
        page = shallow(<ManageRestaurantInformation />);
        instance = page.instance();
    });

    
});