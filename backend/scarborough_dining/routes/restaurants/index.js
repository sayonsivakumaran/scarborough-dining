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
        yearEstablished,
        menuItems,
        announcements
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
        announcements
    });
    
    newRestaurant.save()
        .then(() => res.json('Restaurant has been added.'))
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
            restaurant.postalCode = req.body.postalCode;
            restaurant.cuisineTypes = req.body.cuisineTypes;
            restaurant.description = req.body.description;
            restaurant.menuItemIDs = req.body.menuItemIDs;
            restaurant.announcements = req.body.announcements;

            restaurant.save()
                .then(() => res.json('Restaurant has been updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

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

router.route('/updateRes/:id').post((req, res) => {
    Restaurant.findById(req.params.id)
        .then(restaurant => {
            restaurant.announcements = req.body.announcements;

            restaurant.save()
                .then(() => res.json('Restaurant announcements updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

})
module.exports = router;