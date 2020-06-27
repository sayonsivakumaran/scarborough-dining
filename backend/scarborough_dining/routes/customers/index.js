const express = require('express');
const router = express.Router();
const Password = require('../../utilities/password');
let Customer = require('../../models/customer');

router.route('/').get((req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json('Error: ' + err));
});

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

router.route('/:id').get((req, res) => {
    Customer.findById(req.params.id)
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Customer.findByIdAndDelete(req.params.id)
        .then(() => res.json('Customer has been removed.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

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