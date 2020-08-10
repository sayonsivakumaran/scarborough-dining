import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import ManageAnnouncements from '../index';

jest.mock('axios');

it('initialize', () => {
    const div = 'd';
    expect(div).toEqual('d');
});
