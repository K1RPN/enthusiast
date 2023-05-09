const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const config = require('../config');

console.log('JWT_SECRET:', process.env.JWT_SECRET);
exports.register = async (req, res) => {
    try {
        const existingUser = await User.findOne({ where: { username: req.body.username } });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({ ...req.body, password: hashedPassword, role: 'user', });

        // Генерация токена
        const payload = {
            userId: newUser.id,
            role: newUser.role,
        };
        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Отправка ответа с пользователем и токеном
        res.status(201).json({ user: newUser, token: token });
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ error: 'Something went wrong', message: error.message });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).send({
                message: 'Authentication failed. User not found.',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send({
                message: 'Authentication failed. Wrong password.',
            });
        }

        const payload = {
            userId: user.id,
            role: user.role,
        };
        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

        console.log('Generated Token:', token);
        return res.send({
            message: 'Authentication successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
            },
            userId: user.id, // Добавьте эту строку
        });
    } catch (error) {
        return res.status(500).send({ message: `Error in login: ${error}` });
    }
};




exports.logout = async (req, res) => {
    // Implement your logout logic, e.g., blacklist the refresh token
    res.status(200).json({ message: 'Logged out' });
};

exports.refresh = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        res.status(401).json({ error: 'No refresh token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(403).json({ error: 'Invalid refresh token' });
    }
};
