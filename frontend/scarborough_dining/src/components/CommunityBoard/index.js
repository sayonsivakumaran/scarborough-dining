import React, { Component } from 'react';
import Post from './Post';

import axios from 'axios';
import './styles.css';
import FileUpload from '../FileUpload';

export default class CommunityBoard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loggedIn: false,
            verified: false,
            inputError: false,
            id : "",
            displayName : "",
            restaurantId: "",
            posts: [],
            postTitle: "",
            postContent: "",
            postImage: undefined
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        await axios.get('/auth/login/success')
            .then(results => this.setState({
            loggedIn: true,
            id: results.data.user.googleId
            })
        ).catch(err => this.setState({
                loggedIn: false
            })
        );

        if (this.state.loggedIn) {
            await axios.get(`user/${this.state.id}`).then(results => {
                this.setState({
                    restaurantId: results.data.restaurantId,
                    displayName: results.data.displayName
                });
            })

            if (this.state.restaurantId) {
                axios.get('/restaurants/' + this.state.restaurantId).then(response => {
                    this.setState({
                        restaurantName: response.data.name,
                        verified: response.data.verified
                    });
                })
            }
        }
        this._getPosts();
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
            inputError: false
        })
    }
    
    _getPosts() {
        axios.get('/posts/').then(response => {
            this.setState({
                posts: response.data
            });
        })
    }

    async handleSubmit(event) {
        let imageUrl;

        event.preventDefault();
        if (this.state.postImage) {
            imageUrl = await this._uploadImageURL(this.state.postImage);
        }
        let post = {
            posterGoogleId: this.state.id,
            title: this.state.postTitle,
            displayName: this.state.displayName,
            restaurantName: this.state.restaurantName,
            restaurantId: this.state.restaurantId,
            content: this.state.postContent,
            imageURLs: imageUrl
        }
        console.log("post", post);
        axios.post('/posts/add', post).then(
        ).catch((error) => {
            this.setState({
                inputError: true
            })
            console.log(error);
        })
    }

    /**
     * Handles change for restaurant logo file
     * @param {*} e 
     */
    handleImageChange = e => {
        e.preventDefault();
        this.setState({
            postImage: e.target.files[0] || undefined
        });
    }

        /**
     * Handles delete for restaurant logo file
     * @param {Object} event the event to be deleted
     */
    handleImageDelete = e => {
        e.preventDefault();
        this.setState({
            postImage: undefined
        });
    }

        /**
     * Makes file upload request and returns the cloudinary url
     * @param {*} image to be uploaded
     */ 
    _uploadImageURL = async image => {
        const formData = new FormData();
        formData.append('file', image);
        return axios.post('/media_upload/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            } 
        }).then(
            response => response.data.result.secure_url
        ).catch(e => e);
    }

    render() {
        return (
            <div className="discussion-board-page">
                {console.log(this.state)}
                <div className="container1">
                    <h1>Community Board</h1>
                    <h4>Stay up to date with the restaurant community in Scarborough!</h4>
                    <div className="posts">
                        {
                            this.state.posts.map(post => {
                                return <Post key={post._id} post={post} />
                            })
                        }
                    </div>
                    {this.state.loggedIn && this.state.restaurantId && this.state.verified &&
                        <div className="createPost">
                        <h4>Create a Post</h4>
                        <div class="card">
                        <div class="card-header">
                            <input type="text" name="postTitle" required={true} class={this.state.inputError ? "form-control input-error" : "form-control"} onChange={this.handleChange} placeholder="Post Title"/>
                        </div>
                        <div class="card-body">

                        <div class="form-group has-error">
                            <textarea name="postContent" class={this.state.inputError ? "form-control content-input input-error" : "form-control content-input"} rows="4" cols="50" onChange={this.handleChange} placeholder="Post Content"></textarea>
                        </div>
                        <div className="fileUpload">
                            <FileUpload name="postImage" acceptedFiles={'image/*'} onFileUpload={this.handleImageChange} onFileDelete={this.handleImageDelete}/>
                        </div>
                            <input class="btn btn-primary" onClick={this.handleSubmit} type="submit" value="Submit"/>
                        </div>
                        </div>
                    </div> 
                    }
                </div>
            </div>
        )
    }
}
