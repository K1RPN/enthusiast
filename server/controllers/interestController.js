const { Interest } = require('../models');
const { UserInterest } = require('../models'); // Добавлено

exports.addInterests = async (req, res) => {
    const userId = req.userId;
    const interests = req.body.interests;

    try {
        const newInterests = await Interest.bulkCreate(interests, { returning: true });
        const userInterests = newInterests.map((interest) => ({
            userId: userId,
            interestId: interest.id
        }));

        await UserInterest.bulkCreate(userInterests);

        res.status(201).json({ message: 'Interests added successfully.' });
    } catch (error) {
        console.error(error); // Добавлено
        res.status(500).json({ error: 'Failed to add interests.' });
    }
};
