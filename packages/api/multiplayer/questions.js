const axios = require("axios");
const { quizRanking } = require("../database/models/quizRanking");

async function generateQuestion() {
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
}

generateQuestion();

async function checkAnswer(userId, isCorrect) {
  // fetching user quiz info
  const userInfo = await quizRanking.findOne({ userId });

  // if the user's answer is Correct
  if (isCorrect) {
    const oldQuestioncount = userInfo.totalQuestions;
    const oldPoints = userInfo.totalPoints;
    const count = oldQuestioncount++;
    const points = oldPoints + 10;

    // updating scores points and question count
    userInfo.totalQuestions = count;
    userInfo.totalPoints = points;
    await userInfo.save({ validateBeforeSave: true });

    return true;
  }
  // if the user's answer is Wrong
  if (!isCorrect) {
    const userInfo = await quizRanking.findOne({ userId });
    const oldQuestioncount = userInfo.questionCount;
    const count = oldQuestioncount++;

    userInfo.totalQuestions = count;
    userInfo.save({ validateBeforeSave: true });

    return false;
  }
}
