import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';

// UI element for an announcement
function Announcement(props) {
    return (
        <div id="posts-section">
            <div class="post">
                {props.isManager ? (
                    <button type="button" class="close" aria-label="Close" onClick={props.onDelete}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                ) : (
                    <div></div>
                )}
                <div class="post-title">
                    {props.postTitle}
                </div>
                <div class="post-body">
                    {props.postBody}
                </div>
            </div>
        </div>
    )
}

export class ManageAnnouncements extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            newPostTitle: '',
            newPostBody: ''
        }
        // TODO: change for Google login
        const resID = '5f1e01c222f7b00d879639b7';
        this._getAnnouncements(resID);
    }

    // Add a post to the state
    addPost = () => {
        // Make a copy of the state called <newState>
        const newState = Object.assign({}, this.state);
        // Add the newPost and reset newPost's fields
        const newPost = {
            restaurantID: '5f1e01c222f7b00d879639b7', // TODO: Change for google login
            postTitle: this.state.newPostTitle,
            postBody: this.state.newPostBody
        }
        newState.posts.push(newPost)
        newState.newPostTitle = '';
        newState.newPostBody = '';
        this.setState(newState);
    }

    // Handle event where post title in form is changed
    onPostTitleChange = (e) => {
        e.preventDefault();
        this.setState({
            newPostTitle: e.target.value
        })
    }

    // Handle event where post body in form is changed
    onPostBodyChange = (e) => {
        e.preventDefault();
        this.setState({
            newPostBody: e.target.value
        })
    }

    // Delete a post from the state and database
    deletePost = (index) => {
        let newState = this.state.posts.reverse().splice(index, 1);
        this.setState(newState);

        let postReqs = this.state.posts.reverse().map((post) => {
            return {
                restaurantID: post.restaurantID,
                title: post.postTitle,
                body: post.postBody
            };
        });
        // TODO: change for Google login
        const resID = '5f1e01c222f7b00d879639b7';
        this._postAnnouncements(postReqs, resID);
    }

    // API call to post restaurant's announcements to database
    _postAnnouncements = async (posts, resID) => {
        const response = {
            announcements: posts
        }
        axios.post('/restaurants/updateRes/' + resID, response)
            .then(res => console.log(res.data))
            .catch(e => e);
    }

    // API call to get restaurant's announcements from database
    _getAnnouncements = (resID) => {
        axios.get('/restaurants/' + resID).then(response => {
            const posts = response.data.announcements;
            let newPosts = [];

            for (let i=0; i < posts.length; i++) {
                newPosts.push({
                    restaurantID: posts[i].restaurantID,
                    postTitle: posts[i].title,
                    postBody: posts[i].body
                })
            }
            this.setState({
                posts: newPosts
            })
        })
    }

    // Handle submission of form
    onSubmit = async e => {
        e.preventDefault();
        this.addPost();

        let posts = this.state.posts;

        let postReqs = posts.map((post) => {
            return {
                restaurantID: post.restaurantID,
                title: post.postTitle,
                body: post.postBody
            };
        });
        const resID = '5f1e01c222f7b00d879639b7';

        // TODO: use the response to get the announcement IDs and associate them with the restaurant owners
        let response = await this._postAnnouncements(postReqs, resID);
    }

    // Render the announcements form and restaurant's announcements to the screen
    render() {
        const isManager = this.props.isManager;
        return (
            <React.Fragment>
                {isManager ? (
                    <div class="ann-body">
                    <form class="ann-form" id="create_message_form" onSubmit={this.onSubmit}>
                        <div class="form_title">Post an Announcement</div>
                        <input type="text" id="post_title" class="form_element" placeholder="Enter a title" name="ann_title" required value={this.state.newPostTitle} onChange={this.onPostTitleChange}/>
                        <textarea rows="5" id="post_content" class="form_element" name="user_message" placeholder="Enter a message" required value={this.state.newPostBody} onChange={this.onPostBodyChange}/>
                        <input class="post-btn" type="submit" value="Post your announcement"></input>
                    </form>
                    </div>
                ) : (
                    <div></div>
                )}
                <div className="announcements-header">
                    <h1>Announcements</h1>
                </div>
                {
                    this.state.posts.reverse().map(
                        (post, i) => {
                            return (
                                <Announcement key={i} postTitle={post.postTitle} postBody={post.postBody} onDelete={() => this.deletePost(i)} isManager={isManager}/>
                            )
                        })
                }
            </React.Fragment>
        )
    }
}

export default ManageAnnouncements
