const quizLeaderBoard = require("../database/models/quizLeaderBoardSchema");

async function leaderBoard(req, res) {
  let data = await quizLeaderBoard.find().sort({ totalPoints: -1 });
  if (data.length) {
    data = data.map((user, i) => {
      const newUserObj = {
        rank: i + 1,
        username: user.username,
        totalQuestions: user.totalQuestions,
        totalPoints: user.totalPoints,
      };
      return newUserObj;
    });
  }
  return res.status(200).json({
    success: true,
    data,
  });
}

module.exports = leaderBoard;
