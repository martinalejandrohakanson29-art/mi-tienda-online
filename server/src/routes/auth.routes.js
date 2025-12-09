const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!(username && password)) {
            return res.status(400).send('All input is required');
        }

        const user = await User.findOne({ where: { username } });

        if (user && (await bcrypt.compare(password, user.password_hash))) {
            const token = jwt.sign(
                { user_id: user.id, username },
                process.env.JWT_SECRET,
                {
                    expiresIn: '2h',
                }
            );

            return res.status(200).json({ token });
        }
        return res.status(400).send('Invalid Credentials');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// Helper route to create the first admin user (remove in production or protect)
router.post('/register-admin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).send('User already exists');
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password_hash: encryptedPassword
        });
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
