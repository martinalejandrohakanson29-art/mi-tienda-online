const sequelize = require('../config/db');
const User = require('./User');
const Product = require('./Product');
const Config = require('./Config');
const Carousel = require('./Carousel');

const syncDB = async () => {
    try {
        await sequelize.sync({ alter: true }); // Use alter: true to update tables without dropping
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

module.exports = {
    sequelize,
    syncDB,
    User,
    Product,
    Config,
    Carousel
};
