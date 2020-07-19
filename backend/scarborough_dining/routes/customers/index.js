const express = require('express');
const router = express.Router();

// Customer Model
let Customer = require('../../models/customer');

// Password Utility
const Password = require('../../utilities/password');
const { json } = require('express');
const { validatePassword } = require('../../utilities/password');

/**
 * Server-side get request to retrieve customer data from database.
 * @return all of the customer data in the database.
 */
router.route('/').get((req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Server-side post request to upload customer data to database.
 * Requires relevant fields for a customer.
 */
router.route('/add').post((req, res) => {
    const { 
        email,
        password, 
        firstName, 
        middleName,
        lastName,
        address,
        city,
        province,
        postalCode,
        favouriteRestaurantIDs,
        ratings
    } = req.body;

    const newCustomer = new Customer({
        email, 
        password, 
        firstName, 
        middleName, 
        lastName, 
        address, 
        city, 
        province, 
        postalCode,
        favouriteRestaurantIDs,
        ratings
    });
    newCustomer.password = Password.generateHashedPassword(password);
    
    newCustomer.save()
        .then(() => res.json('Customer has been added.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * @route           POST /customers/login
 * @description     Check database for customer with specific email, and checks
 *                  that password is correct
 * @returns         Returns data of the customer with specific email
 */
router.post('/login', (req, res) => {

    email = req.body.email;

    Customer.findOne({ email })
        .then(customer => {
            // Check that email exists
            if (!customer) {
                return res.status(404).json({ emailNotFound: "Email not found"});
            }
            else {
                payload = {
                    customer
                }
                console.log(payload)
                res.json(payload);
            }
        })
});

/**
 * Server-side get request to retrieve a single customer data from database.
 * Requires the database id of the customer
 * @return the relevant customer's data in the database.
 */
router.route('/:id').get((req, res) => {
    Customer.findById(req.params.id)
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Server-side delete request to remove customer of the id's data from database.
 * Requires the database id of the customer.
 */
router.route('/:id').delete((req, res) => {
    Customer.findByIdAndDelete(req.params.id)
        .then(() => res.json('Customer has been removed.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * Server-side post request to update customer data in database.
 * Requires the customer id and the fields that will be updated.
 */
router.route('/update/:id').post((req, res) => {
    Customer.findById(req.params.id)
        .then(customer => {
            customer.email = req.body.email;
            customer.password = Password.generateHashedPassword(req.body.password);
            customer.firstName = req.body.firstName;
            customer.middleName = req.body.middleName;
            customer.lastName = req.body.lastName;
            customer.address = req.body.address;
            customer.city = req.body.city;
            customer.province = req.body.province;
            customer.postalCode = req.body.postalCode;
            customer.favouriteRestaurantIDs = req.body.favouriteRestaurantIDs;
            customer.ratings = req.body.ratings;

            customer.save()
                .then(() => res.json('Customer has been updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;