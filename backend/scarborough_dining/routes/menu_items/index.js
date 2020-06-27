const express = require('express');
const router = express.Router();
let MenuItem = require('../../models/menu_item');

router.route('/').get((req, res) => {
    MenuItem.find()
        .then(menuItem => res.json(menuItem))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const { 
        name,
        restaurantID,
        price, 
        imageURL,
        description,
        cuisineTypes
    } = req.body;

    const newMenuItem = new MenuItem({
        name,
        restaurantID,
        price, 
        imageURL,
        description,
        cuisineTypes
    });
    
    newMenuItem.save()
        .then(() => res.json('MenuItem has been added.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    MenuItem.findById(req.params.id)
        .then(menuItem => res.json(menuItem))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    MenuItem.findByIdAndDelete(req.params.id)
        .then(() => res.json('MenuItem has been removed.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    MenuItem.findById(req.params.id)
        .then(menuItem => {
            menuItem.name = req.body.name;
            menuItem.restaurantID = req.body.restaurantID;
            menuItem.price = req.body.price;
            menuItem.imageURL = req.body.imageURL;
            menuItem.description = req.body.description;
            menuItem.cuisineTypes = req.body.cuisineTypes;

            menuItem.save()
                .then(() => res.json('MenuItem has been updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;