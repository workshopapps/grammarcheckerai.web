const axios = require("axios");
const quizLeaderBoard = require("../database/models/quizLeaderBoardSchema");

exports.generateQuestion = async function () {
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
};

exports.userQuizProfileUpdateHandler = async (userId, isCorrect) => {
  // fetching user quiz info
  const userQuizProfile = await quizLeaderBoard.findOne({ userId });
  // update questions attempted count
  userQuizProfile.totalQuestion += 1;

  // if the user's answer is Correct
  if (isCorrect) userQuizProfile.totalPoints += 10;
  await userInfo.save({ validateBeforeSave: true });
};
