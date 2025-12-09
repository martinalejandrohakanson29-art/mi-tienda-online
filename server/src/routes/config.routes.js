const express = require('express');
const router = express.Router();
const { Config } = require('../models');
const auth = require('../middleware/auth');

// Get config
router.get('/', async (req, res) => {
    try {
        let config = await Config.findOne();
        if (!config) {
            // Create default config if not exists
            config = await Config.create({});
        }
        res.json(config);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update config (Protected)
router.put('/', auth, async (req, res) => {
    try {
        let config = await Config.findOne();
        if (!config) {
            config = await Config.create(req.body);
        } else {
            await config.update(req.body);
        }
        res.json(config);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
