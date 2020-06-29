const express = require('express');
const router = express.Router();
const Password = require('../../utilities/password');
let Owner = require('../../models/owner');

router.route('/').get((req, res) => {
    Owner.find()
        .then(owner => res.json(owner))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const { 
        email,
        password, 
        firstName, 
        middleName,
        lastName,
        restaurantID
    } = req.body;

    const newOwner = new Owner({
        email, 
        password, 
        firstName, 
        middleName, 
        lastName, 
        restaurantID
    });
    newOwner.password = Password.generateHashedPassword(password);
    
    newOwner.save()
        .then(() => res.json('Owner has been added.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Owner.findById(req.params.id)
        .then(owner => res.json(owner))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Owner.findByIdAndDelete(req.params.id)
        .then(() => res.json('Owner has been removed.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Owner.findById(req.params.id)
        .then(owner => {
            owner.email = req.body.email;
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