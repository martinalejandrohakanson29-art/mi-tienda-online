const express = require('express');
const router = express.Router();
const { Carousel } = require('../models');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

// Get all carousel items
router.get('/', async (req, res) => {
    try {
        const items = await Carousel.findAll({ order: [['order', 'ASC']] });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add carousel item (Protected)
router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Image is required' });

        const { title, order } = req.body;
        const image_url = `/uploads/${req.file.filename}`;

        const item = await Carousel.create({
            title,
            order,
            image_url
        });
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete carousel item (Protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const item = await Carousel.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (item.image_url) {
            const oldPath = path.join(__dirname, '../../..', item.image_url);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        await item.destroy();
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
