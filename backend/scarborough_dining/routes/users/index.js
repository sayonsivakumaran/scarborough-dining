const express = require('express');
const router = express.Router();

let User = require('../../models/user');

// all routes will be based on /user/<request information here>

/**
 * @route               /user
 * @description         Server-side GET request to retrieve all users in database
 */
router.route('/').get((req, res) => {
    User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
})

/**
 * @route               /user/getUserNameMap
 * @description         Server-side GET request to retrieve all user's  names in database
 */
router.route('/getUserNameMap').get((req, res) => {
    User.find()
    .then(response => {
        let nameMap = {};
        response.forEach(user => {
            console.log(user);
            nameMap[user.googleId] = user.firstName + " " + user.lastName;
        });
        res.json(nameMap);
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

/**
 * @route               /user/:googleId
 * @description         Requires a valid googleId, returns the user with specified googleId
 */
router.route('/:googleId').get((req, res) => {
    User.findOne({ googleId: req.params.googleId })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
})

/**
 * @route               /user/update/:googleId
 * @description         Requires a valid googleId, updates user with specified 
 *                      googleId's account information
 */
router.route('/update/:id').post((req, res) => {
    User.findOne({googleId: req.params.id })
        .then(user => {

            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.address = req.body.address;
            user.city = req.body.city;
            user.postalCode = req.body.postalCode;
            user.province = req.body.province;
            
            user.save()
                .then(() => res.json('User has been updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
                
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * @route           /user/add-restaurant/:googleId
 * @description     POST request to add a restaurantId to user's data
 */
router.route('/add-restaurant/:googleId').post((req, res) => {
    User.findOne({ googleId: req.params.googleId })
    .then(user => {
        user.restaurantId = req.body.restaurantId;

        user.save()
            .then(() => res.json('User has been updated.'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Shopping Cart Routes

/**
 * @route               /user/add-to-shopping-cart/:googleId
 * @description         Requires a valid googleId, updates the shopping cart of the user with specified 
 *                      googleId's account information
 */
router.route('/add-to-shopping-cart/:googleId').post((req, res) => {
    User.findOne({ googleId: req.params.googleId })
        .then(user => {
            let shoppingCart = user.shoppingCart || [];
            let orderItem = {};
            let existingItem = shoppingCart.find(item => item && item.menuItemID == req.body._id);
            
            if (existingItem) {
                existingItem.total = existingItem.total + req.body.total;
            } else {
                orderItem.name = req.body.name;
                orderItem.menuItemID = req.body._id;
                orderItem.price = req.body.price;
                orderItem.imageURL = req.body.imageURL;
                orderItem.description = req.body.description;
                orderItem.cuisineTypes = req.body.cuisineTypes;
                orderItem.total = req.body.total;
                orderItem.restaurantID = req.body.restaurantID;
                orderItem.userGoogleID = req.params.googleId;
                user.shoppingCart = shoppingCart.concat(orderItem);
            }
            
            user.save()
                .then(() => res.json('Items have been added to shopping cart.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * @route               /user/get-shopping-cart/:googleId
 * @description         Requires a valid googleId, gets the shopping cart of the user with specified 
 *                      googleId's account information
 */
router.route('/get-shopping-cart/:googleId').get((req, res) => {
    User.findOne({ googleId: req.params.googleId })
        .then(user => res.json(user.shoppingCart))
        .catch(err => res.status(400).json(err));
});

/**
 * @route               /user/delete-cart-item/:googleId/:menuItemID
 * @description         Requires a valid googleId and menuItemID, updates shopping of cart of the user
 *                      with the specific googleId, by removing the item with the menuItemID
 */
router.route('/delete-cart-item/:googleId/:menuItemID').post((req, res) => {
    User.findOne({ googleId: req.params.googleId })
        .then(user => {
            let shoppingCart = user.shoppingCart || [];
            let updatedCart = shoppingCart.filter(item => item && item.menuItemID != req.params.menuItemID);
            user.shoppingCart = updatedCart;

            user.save()
                .then(() => res.json(user.shoppingCart))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
});

/**
 * @route               /user/clear-shopping-cart/:googleId
 * @description         Requires a valid googleId, updates user with specified 
 *                      googleId's account information by clearing shopping cart based on provided restaurant
 */
router.route('/clear-shopping-cart-by-restaurant/:googleId/:restaurantID').post((req, res) => {
    User.findOne({ googleId: req.params.googleId })
        .then(user => {
            let shoppingCart = user.shoppingCart || [];
            let updatedCart = shoppingCart.filter(item => item && item.restaurantID != req.params.restaurantID)
            user.shoppingCart = updatedCart;

            user.save()
                .then(() => res.json(updatedCart))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;