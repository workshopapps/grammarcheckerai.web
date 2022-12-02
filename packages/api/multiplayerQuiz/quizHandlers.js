const quizLeaderBoard = require("../database/models/quizLeaderBoardSchema");
const { userCollection } = require("../database/models/userSchema");

exports.startQuizHandler = async (userId) => {
  let userQuizProfile = await quizLeaderBoard.findOne({ userId });
  if (!userQuizProfile) {
    const user = await userCollection.findById(userId);
    userQuizProfile = await quizLeaderBoard.create({
      userId,
      username: user.username,
    });
  }
};

exports.receiveRoundWinnerHandler = async (winnerUserId, userId) => {
  const isWinner = winnerUserId === userId;
  const user = await userCollection.findById(winnerUserId);
  return `${isWinner ? "You" : user.username} won this round.`;
};
