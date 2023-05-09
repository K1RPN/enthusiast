module.exports = (db) => {
    const { User, Chat, Message, Startup, StartupMember, Idea, IdeaRating, Friendship, Vote, VoteOption, UserVote, ChatMember, Interest, UserInterest, Poll, IdeaVote, PollOption } = db;

    // Associations
    User.belongsToMany(User, { as: 'Friends', through: Friendship });
    User.belongsToMany(Chat, { through: ChatMember });
    Chat.belongsToMany(User, { through: ChatMember });
    User.hasMany(Message, { foreignKey: 'userId' });
    Message.belongsTo(User);
    Chat.hasMany(Message, { foreignKey: 'chatId' });
    Message.belongsTo(Chat);
    User.hasMany(Startup, { as: 'CreatedStartups', foreignKey: 'creatorId' });
    User.belongsToMany(Startup, { as: 'MemberStartups', through: StartupMember });
    Startup.belongsToMany(User, { as: 'Members', through: StartupMember });
    User.hasMany(Idea, { foreignKey: 'userId' });
    Idea.belongsTo(User);
    Startup.hasMany(Idea, { foreignKey: 'startupId' });
    Idea.belongsTo(Startup);
    User.hasMany(IdeaRating, { foreignKey: 'userId' });
    IdeaRating.belongsTo(User);
    Idea.hasMany(IdeaRating, { foreignKey: 'ideaId' });
    IdeaRating.belongsTo(Idea);
    User.belongsToMany(Vote, { through: UserVote });
    Vote.belongsToMany(User, { through: UserVote });
    Chat.hasMany(Vote, { foreignKey: 'chatId' });
    Vote.belongsTo(Chat);
    Vote.hasMany(VoteOption, { foreignKey: 'voteId' });
    VoteOption.belongsTo(Vote);
    User.belongsToMany(Interest, { through: UserInterest });
    Interest.belongsToMany(User, { through: UserInterest });
    Idea.belongsToMany(User, { as: 'Voters', through: IdeaVote });
    User.belongsToMany(Idea, { as: 'VotedIdeas', through: IdeaVote });
    Poll.hasMany(PollOption, { foreignKey: 'pollId' });
    PollOption.belongsTo(Poll);
};
