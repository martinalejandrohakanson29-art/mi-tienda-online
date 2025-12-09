const express = require('express');
const router = express.Router();
const { Product } = require('../models');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create product (Protected)
router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const { title, description, price, stock, category } = req.body;
        const image_url = req.file ? `/uploads/${req.file.filename}` : null;

        const product = await Product.create({
            title,
            description,
            price,
            stock,
            category,
            image_url
        });
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update product (Protected)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const { title, description, price, stock, category } = req.body;
        let image_url = product.image_url;

        if (req.file) {
            // Delete old image if exists
            if (image_url) {
                const oldPath = path.join(__dirname, '../../..', image_url);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            image_url = `/uploads/${req.file.filename}`;
        }

        await product.update({
            title,
            description,
            price,
            stock,
            category,
            image_url
        });

        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete product (Protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (product.image_url) {
            const oldPath = path.join(__dirname, '../../..', product.image_url);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        await product.destroy();
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
