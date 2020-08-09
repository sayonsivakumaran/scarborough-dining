const express = require('express');
const router = express.Router();
let Restaurant = require('../../models/restaurant');

/**
 * Server-side get request to retrieve all restaurant data
 * @return tall of the restaurant data
 */
router.route('/').get((req, res) => {
    Restaurant.find()
        .then(restaurant => res.json(restaurant))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Server-side get request to retrieve all unverified restaurant data
 * @return all unverified restaurant data
 */
router.route('/unverified').get((req, res) => {
    Restaurant.find({verified: {$in: [null, false]}}).then(restaurant => res.json(restaurant))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Server-side get request to retrieve all verified restaurant data
 * @return all verified restaurant data
 */
router.route('/verified').get((req, res) => {
    Restaurant.find({verified: {$eq: true}}).then(restaurant => res.json(restaurant))
        .catch(err => res.status(400).json('Error: ' + err));
});


/**
 * Server-side post request to upload a specific restaurant's data.
 * Requires restaurant information.
 */
router.route('/add').post((req, res) => {
    const { 
        ownerID,
        ratings, 
        name,
        logoURL,
        introVideoURL,
        imageURLs,
        phoneNumber, 
        address,
        city,
        province,
        postalCode,
        cuisineTypes,
        description,
        longDescription,
        menuItems,
        yearEstablished,
        verified,
        orderRequests
    } = req.body;

    const newRestaurant = new Restaurant({ 
        ownerID,
        ratings, 
        name,
        logoURL,
        introVideoURL,
        imageURLs,
        phoneNumber, 
        address,
        city,
        province,
        postalCode,
        cuisineTypes,
        description,
        longDescription,
        yearEstablished,
        menuItems,
        verified,
        orderRequests
    });
    
    newRestaurant.save()
        .then(() => res.json())
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Server-side get request to retrieve a specific restaurant's data.
 * Requires a database id of the restaurant
 * @return the restaurant associated with the id
 */
router.route('/:id').get((req, res) => {
    Restaurant.findById(req.params.id)
        .then(restaurant => res.json(restaurant))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Server-side delete request to remove a specific restaurant's data.
 * Requires a database id of the restaurant
 */
router.route('/:id').delete((req, res) => {
    Restaurant.findByIdAndDelete(req.params.id)
        .then(() => res.json('Restaurant has been removed.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Server-side get request to retrieve a specific restaurant's data.
 * Requires a googleId of the restaurant owner
 * @return the restaurant associated with the id
 */
router.route('/owner/:id').get((req, res) => {
    Restaurant.findOne({ ownerID: req.params.id })
        .then(restaurant => res.json(restaurant))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Server-side post request to update a specific restaurant's data.
 * Requires a database id of the restaurant and new information
 */
router.route('/update/:id').post((req, res) => {
    Restaurant.findById(req.params.id)
        .then(restaurant => {
            restaurant.ownerID = req.body.ownerID;
            restaurant.ratings = req.body.ratings;
            restaurant.name = req.body.name;
            restaurant.logoURL = req.body.logoURL;
            restaurant.imageURLs = req.body.imageURLs;
            restaurant.phoneNumber = req.body.phoneNumber;
            restaurant.address = req.body.address;
            restaurant.city = req.body.city;
            restaurant.province = req.body.province;
            restaurant.introVideoURL = req.body.introVideoURL;
            restaurant.postalCode = req.body.postalCode;
            restaurant.cuisineTypes = req.body.cuisineTypes;
            restaurant.description = req.body.description;
            restaurant.longDescription = req.body.longDescription;
            restaurant.menuItems = req.body.menuItems;
            restaurant.verified = req.body.verified;
            restaurant.orderRequests = req.body.orderRequests;
            restaurant.yearEstablished = req.body.yearEstablished;

            restaurant.save()
                .then(() => res.json('Restaurant has been updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * @route               /restaurants/addMenuItems/:restaurantID
 * @description         Requires a valid restaurantID, updates restaurant with ID
 *                      by adding menu items to the list
 */
router.route('/addMenuItems/:restaurantID').post((req, res) => {
    Restaurant.findById(req.params.restaurantID)
        .then(restaurant => {
            let menuItems = restaurant.menuItems || [];
            menuItems = menuItems.concat(req.body.menuItems);
            restaurant.menuItems = menuItems;

            restaurant.save()
                .then(() => res.json('Menu items have been added to restaurant.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * @route               /restaurants/verify/:id
 * @description         Requires a valid restaurantID, updates restaurant with associated ID
 *                      by changing it's status to verified
 */
router.route('/verify/:id').post((req, res) => {
    Restaurant.findById(req.params.id)
        .then(restaurant => {
            restaurant.verified = true;
            restaurant.save()
                .then(() => res.json('Restaurant has been verified.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * @route               /restaurants/addOrderRequest/:restaurantID
 * @description         Requires a valid restaurant ID, and updates the restaurant's order
 *                      requests by adding a new request
 */
router.route('/addOrderRequest/:restaurantID').post((req, res) => {
    Restaurant.findById(req.params.restaurantID)
        .then(restaurant => {
            let orderRequests = restaurant.orderRequests || [];
            let incomingRequests = req.body;
            let requestArray = [];
            for (let i = 0; i < incomingRequests.length; i++) {
                let orderItem = {};
                orderItem.name = incomingRequests[i].name;
                orderItem.menuItemID = incomingRequests[i]._id;
                orderItem.price = incomingRequests[i].price;
                orderItem.imageURL = incomingRequests[i].imageURL;
                orderItem.description = incomingRequests[i].description;
                orderItem.cuisineTypes = incomingRequests[i].cuisineTypes;
                orderItem.total = incomingRequests[i].total;
                orderItem.userGoogleID = incomingRequests[i].userGoogleId;
                orderItem.restaurantID = incomingRequests[i].restaurantID;

                requestArray = requestArray.concat(orderItem);
            }

            restaurant.orderRequests = orderRequests.concat([requestArray]);
            restaurant.save()
                .then(() => res.json('Items have been requested'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(404).json('Error: ' + err));
});

module.exports = router;