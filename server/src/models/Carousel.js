const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Carousel = sequelize.define('Carousel', {
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Carousel;
