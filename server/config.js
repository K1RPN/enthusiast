require('dotenv').config();

const config = {
    JWT_SECRET: process.env.JWT_SECRET,
    jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
