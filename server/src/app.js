const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const configRoutes = require('./routes/config.routes');
const carouselRoutes = require('./routes/carousel.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/config', configRoutes);
app.use('/api/carousel', carouselRoutes);

// Serve static assets in production (Frontend)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../client/dist', 'index.html'));
    });
}

module.exports = app;
