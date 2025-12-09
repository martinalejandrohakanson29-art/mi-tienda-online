const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Config = sequelize.define('Config', {
    phone: {
        type: DataTypes.STRING
    },
    instagram_link: {
        type: DataTypes.STRING
    },
    tiktok_link: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    location_lat: {
        type: DataTypes.FLOAT
    },
    location_lng: {
        type: DataTypes.FLOAT
    }
});

module.exports = Config;
