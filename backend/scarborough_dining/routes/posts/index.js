const express = require('express');
const router = express.Router();

let Post = require('../../models/post');

/**
 * @route   /post
 * @description Server-side GET request to retrieve all posts in database
 */
router.route('/').get((req, res) => {
    Post.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/add').post((req, res) => {
    const { 
        posterGoogleId,
        restaurantId,
        displayName,
        restaurantName,
        title,
        content,
        imageURLs,
    } = req.body;

    const newPost = new Post({
        posterGoogleId,
        restaurantId,
        displayName, 
        restaurantName, 
        title,
        content, 
        imageURLs,
    });

    newPost.save()
        .then(() => res.json('Post has been created.'))
        .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;