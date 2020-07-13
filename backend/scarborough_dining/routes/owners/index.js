const express = require('express');
const router = express.Router();
const Password = require('../../utilities/password');
let Owner = require('../../models/owner');

/**
 * Server-side get request to retrieve all owner data.
 * @return all owner data
 */
router.route('/').get((req, res) => {
    Owner.find()
        .then(owner => res.json(owner))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Server-side post request to add an owner's data.
 * Requires the owner's informaiton
 */
router.route('/add').post((req, res) => {
    const { 
        email,
        password,
        phoneNumber, 
        firstName, 
        middleName,
        lastName,
        restaurantID
    } = req.body;

    const newOwner = new Owner({
        email, 
        password, 
        phoneNumber,
        firstName, 
        middleName, 
        lastName, 
        restaurantID
    });
    newOwner.password = Password.generateHashedPassword(password);
    
    newOwner.save()
    .then(owner => res.json(owner))
    .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Server-side get request to retrieve a specific owner's data.
 * Requires a database id of the owner
 * @return the owner associated with the id
 */
router.route('/:id').get((req, res) => {
    Owner.findById(req.params.id)
        .then(owner => res.json(owner))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Server-side delete request to remove a specific restaurant's data.
 * Requires a database id of the restaurant
 */
router.route('/:id').delete((req, res) => {
    Owner.findByIdAndDelete(req.params.id)
        .then(() => res.json('Owner has been removed.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Server-side post request to update a specific restaurant's data.
 * Requires a database id of the restaurant and new information.
 */
router.route('/update/:id').post((req, res) => {
    Owner.findById(req.params.id)
        .then(owner => {
            owner.email = req.body.email;
            owner.phoneNumber = req.body.phoneNumber;
            owner.password = Password.generateHashedPassword(req.body.password);
            owner.firstName = req.body.firstName;
            owner.middleName = req.body.middleName;
            owner.lastName = req.body.lastName;
            owner.restaurantID = req.body.restaurantID;

            owner.save()
                .then(() => res.json('Owner has been updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;