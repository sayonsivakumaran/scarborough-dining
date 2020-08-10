import React from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import Post from "../index";

jest.mock('axios');

/**
 * Test suite for Post component
 */
describe('<Post  />', () => {

    let page, instance, props, post, response;
    
    post = {
        title: "title",
        content: "content",
        displayName: "displayName",
        restaurantId: "restaurantId",
        restaurantName: "restaurantName",
        posterGoogleId: "1900",
        imageURLs: ["imageUrl"],
        _id: "1",
    }
    props = {
        post,
        id: "123",
        isPostOwner: true
    };

    response = {}

    const windowReloadSpy = jest.spyOn(Post.prototype, '_windowReload');

    beforeEach(() => {
        page = shallow(<Post {... props}/>);
        instance = page.instance();
    });

    /**
     * Test if constructor sets default state variables
     */
    describe('constructor', () => {
        it('should set state variables correctly', () => {            
            expect(instance.state.title).toEqual(post.title);
            expect(instance.state.content).toEqual(post.content);
            expect(instance.state.displayName).toEqual(post.displayName);
            expect(instance.state.restaurantId).toEqual(post.restaurantId);
            expect(instance.state.restaurantName).toEqual(post.restaurantName);
            expect(instance.state.posterGoogleId).toEqual(post.posterGoogleId);
            expect(instance.state.imageURLs).toEqual(post.imageURLs);
            expect(instance.state.postId).toEqual(post._id);
            expect(instance.state.id).toEqual("123");
            expect(instance.state.isPostOwner).toEqual(true);

        });
    });

    describe('_removeRestaurant', () => {
        it('should not reload window on failed delete', async () => {
            axios.delete.mockImplementationOnce(() => Promise.reject('Error: 400'));
            await instance._removeRestaurant();
            expect(windowReloadSpy).not.toHaveBeenCalled();
        });

        it('should reload window on successful delete', async () => {
            axios.delete.mockImplementationOnce(() => Promise.resolve().then(data => { return {}}));
            await instance._removeRestaurant();
            expect(windowReloadSpy).toHaveBeenCalled();
        });
    });

    /**
     *  Tests if render, renders component accordingly
     */
    describe('render', () => {

        beforeEach(() => {
            post = {
                title: "title",
                content: "content",
                displayName: "displayName",
                restaurantId: "restaurantId",
                restaurantName: "restaurantName",
                posterGoogleId: "1900",
                imageURLs: [],
                _id: "1",
            }

            props = {
                post,
                id: "123",
                isPostOwner: false
            };
        });

        it('should render post content', () => {
            expect(page.find(".card-title").text()).toBe(post.title);
            expect(page.find(".card-text").text()).toBe(post.content);
            expect(page.find(".img-thumbnail").text()).toBeDefined();
            expect(page.find(".img-fluid").text()).toBeDefined();
            expect(page.find(".btn-primary").text()).toBe("Visit Restaurant");
            expect(page.find(".footer-text").text()).toBe("By " + post.displayName + " from " + post.restaurantName);
            expect(page.find(".btn-danger").text()).toBeDefined();
        });


        it('should not render image elements and modal if imageUrl is not provied', () => {
            page = shallow(<Post {... props}/>);
            instance = page.instance();

            expect(page.find('.img-thumbnail').exists()).toBeFalsy();
        });


        it('should not render delete button if isPostOwner is false', () => {
            page = shallow(<Post {... props}/>);
            instance = page.instance();

            expect(page.find('.btn-danger').exists()).toBeFalsy();
        });
    })
});