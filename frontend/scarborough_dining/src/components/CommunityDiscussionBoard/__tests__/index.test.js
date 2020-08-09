import React from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import CommunityDiscussionBoard from "../index";

jest.mock('axios');

/**
 * Test suite for CommunityDiscussionBoard page
 */
describe('<CommunityDiscussionBoard  />', () => {

    let page, instance, response, postsResponse;

    postsResponse = {
        data: ["post"]
    }

    response = {
        data: {
            restaurantId: "restaurantId",
            displayName: "displayName",
            name: "name",
            verified: true,
            user : {
                googleId : "googleId"
            },

        }
    }
        
    axios.get.mockImplementation((url) => {
        if (url === '/posts/') {
            return Promise.resolve().then(data => { return postsResponse});
        } else {
            return Promise.resolve().then(data => { return response});
        }
    });

    axios.post.mockImplementation(() => Promise.reject('Error: 400'));

    const windowReloadSpy = jest.spyOn(CommunityDiscussionBoard.prototype, '_windowReload');

    beforeEach(() => {
        page = shallow(<CommunityDiscussionBoard />);
        instance = page.instance();
    });

    /**
     * Test if constructor sets default state variables
     */
    describe('constructor', () => {
        it('should set state variables correctly', async () => {      
            await instance.componentDidMount();

            expect(instance.state.loggedIn).toBe(true);      
            expect(instance.state.verified).toBe(true);      
            expect(instance.state.inputError).toBe(false);      
            expect(instance.state.id).toBe(response.data.user.googleId);      
            expect(instance.state.displayName).toBe(response.data.displayName);      
            expect(instance.state.restaurantId).toBe(response.data.restaurantId);      
            expect(instance.state.postTitle).toBe("");      
            expect(instance.state.postContent).toBe("");      
            expect(instance.state.postImage).toBe(undefined);      
        });
    });

    /**
     * Test if _getPosts method retrieves data and sets state
     */
    describe('_getPosts', () => {
        it('should call axios for data and set state', async () => {
            await instance._getPosts();
            expect(instance.state.posts).toEqual(postsResponse.data);   
        })
    })


    /** 
     * Tests handleSubmit calls axios accordingly and handles errors
     */
    describe('handleSubmit', () => {
        it('should set inputError to true if axios returns error', async () => {
            instance.setState({
                postImage: "image"
            })
            await instance.handleSubmit({ preventDefault() {} });
            expect(instance.state.inputError).toBe(true);
            expect(windowReloadSpy).not.toHaveBeenCalled();
        });
    });

    /**
     * Tests if handleChange sets appropriate target in state to the given value
     */
    describe('handleChange', () => {
        it('should set target state field to value and set inputError to false', () => {
            instance.setState({
                inputError: true
            });

            let event = {
                target : {
                    value : "postContent",
                    name: "postContent"
                }
            }

            instance.handleChange(event);

            expect(instance.state.postContent).toBe(event.target.value);
            expect(instance.state.inputError).toBe(false);
        })
    });

    /**
     * Tests uploadImageUrl calls axios to get image url
     */
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

    /**
     *  Tests if render, renders component accordingly
     */
    describe('render', () => {
        it('should render create post element', async () => {
            await instance.componentDidMount();
            expect(page.find(".post-title").text()).toBe("Create a Post");
            expect(page.find(".form-control").at(0).text()).toBeDefined();
            expect(page.find(".form-control").at(1).text()).toBeDefined();
            expect(page.find(".btn-primary").exists()).toBeTruthy();
            expect(page.find(".input-error").exists()).not.toBeTruthy();

        });

        it('should render error styles if inputError is true', async () => {
            await instance.componentDidMount();
            instance.setState({
                inputError: true
            });
            page.update();
            expect(page.find(".input-error").exists()).toBeTruthy();
        });

        it('should not render create post element if user is not', () => {
            instance.setState({
                loggedIn: false
            });
            page.update();
            expect(page.find(".createPost").exists()).not.toBeTruthy();
        });

        it('should not render create post element if user is not a verified restaurant owner', () => {
            instance.setState({
                loggedIn: true,
                restaurantId: "1",
                verified: false
            });
            page.update();
            expect(page.find(".createPost").exists()).not.toBeTruthy();
        });
    })
});