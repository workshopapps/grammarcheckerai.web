const axios = require("axios");
const quizLeaderBoard = require("../database/models/quizLeaderBoardSchema");
const { userCollection } = require("../database/models/userSchema");

exports.startQuizHandler = async (userId) => {
  try {
    let userQuizProfile = await quizLeaderBoard.findOne({ userId });
    if (!userQuizProfile) {
      const user = await userCollection.findById(userId);
      userQuizProfile = await quizLeaderBoard.create({
        userId,
        username: user.username,
      });
    }
  } catch (error) {
    throw error;
  }
};

exports.receiveRoundWinnerHandler = async (winnerUserId) => {
  try {
    const user = await userCollection.findById(winnerUserId);
    return `${user.username} won this round.`;
  } catch (error) {
    throw error;
  }
};

exports.generateQuestion = async function () {
  try {
    const quiz = await axios.get(
      "https://the-trivia-api.com/api/questions?limit=1"
    );
    const data = quiz.data[0];
    const question = {
      id: data.id,
      answer: data.correctAnswer,
      incorrectAnswers: data.incorrectAnswers,
      question: data.question,
    };

    return question;
  } catch (error) {
    throw error;
  }
};

exports.userQuizProfileUpdateHandler = async (userId, isCorrect) => {
  try {
    // fetching user quiz info
    const userQuizProfile = await quizLeaderBoard.findOne({ userId });
    // update questions attempted count
    userQuizProfile.totalQuestion += 1;

    // if the user's answer is Correct
    if (isCorrect) userQuizProfile.totalPoints += 10;
    await userQuizProfile.save({ validateBeforeSave: true });
  } catch (error) {
    throw error;
  }
};
