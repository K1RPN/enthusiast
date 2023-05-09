require('dotenv').config();

console.log('JWT_SECRET:', process.env.JWT_SECRET);
const express = require('express');
const app = express();
const cors = require('cors');
const { sequelize } = require('./models');
const routes = require('./routes');
const authMiddleware = require('./middleware/authMiddleware');
const {
    authRoutes,
    interestRoutes,
    userRoutes,
    chatRoutes,
    messageRoutes,
    startupRoutes,
    startupMemberRoutes,
    ideaRoutes,
    ideaRatingRoutes,
    friendshipRoutes,
    voteRoutes,
    voteOptionRoutes,
    userVoteRoutes,
    chatMemberRoutes
} = require("./routes");
app.use(cors({ exposedHeaders: ['authorization'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users/:id', authMiddleware);
app.use('/api/users', userRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/startup-members', startupMemberRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/idea-ratings', ideaRatingRoutes);
app.use('/api/friendships', friendshipRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/vote-options', voteOptionRoutes);
app.use('/api/user-votes', userVoteRoutes);
app.use('/api/chat-members', chatMemberRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        await sequelize.sync({ alter: true, force: false });
        console.log('Database tables have been synchronized.');

        // Запускаем сервер после успешного подключения к базе данных и синхронизации таблиц
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
