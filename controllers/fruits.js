/////////////////////////////////////////////
// Import Dependencies
/////////////////////////////////////////////

const express = require('express');
const Fruit = require('../models/fruit.js');

/////////////////////////////////////////////
// Create Route
/////////////////////////////////////////////

const router = express.Router();

/////////////////////////////////////////////
// Routes
/////////////////////////////////////////////

// Seed 
router.get('/seed', (req, res) => {
    // Array of starter fruits
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: true },
        { name: "Grape", color: "purple", readyToEat: true },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: true },
        { name: "Coconut", color: "brown", readyToEat: false },
    ];

    // Delete all fruits
    Fruit.deleteMany({}).then((data) => {
        // Seed starter fruits
        Fruit.create(startFruits).then((data) => {
            // Sends created fruits as response to confirm creation
            res.json(data);
        });
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// Index
router.get('/', (req, res) => {
    Fruit.find({}).then((fruits) => {
        res.render('fruits/Index', { fruits })
    })
    .catch((error) => {
        res.status(400).json({ error });
    });
});

// New
router.get('/new', (req, res) => {
    res.render('fruits/New');
});

// Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Fruit.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/fruits');
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
});

// Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;
    Fruit.findByIdAndUpdate(id, req.body, { new: true })
        .then(() => {
            res.redirect(`/fruits/${id}`);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
});

// Create
router.post('/', (req, res) => {
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;

    Fruit.create(req.body)
        .then((createdFruit) => {
            res.redirect(`/fruits/${createdFruit._id}`);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
});

// Edit
router.get('/:id/edit', (req, res) => {
    const { id } = req.params;
    Fruit.findById(id)
        .then((fruit) => {
            res.render('fruits/Edit', { fruit });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
});

// Show
router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    Fruit.findById(id)
        .then((fruit) => {
            res.render('fruits/Show', { fruit });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
});

module.exports = router;