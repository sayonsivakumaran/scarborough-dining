const router = require('express').Router();
let Customer = require('../models/customer');

router.route('/').get((req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const { email, firstName, lastName } = req.body;

    const newCustomer = new Customer({email, firstName, lastName});

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
            customer.firstName = req.body.firstName;
            customer.lastName = req.body.lastName;

            customer.save()
                .then(() => res.json('Customer has been updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;