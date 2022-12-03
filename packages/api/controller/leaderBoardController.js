const quizLeaderBoard = require("../database/models/quizLeaderBoardSchema");

async function leaderBoard(req, res) {
  const data = await quizLeaderBoard.find().sort({ totalPoints: -1 });
  if (data.length) {
    data.forEach((user, i) => {
      user.rank = i + 1;
    });
  }

  return res.status(200).json({
    success: true,
    data,
  });

  if (data) {
    res.status(200);
    res.json({ message: "Your request was successful", data });
    return;
  }

  if (!data) {
    res.status(404);
    res.json({ message: "no user has played the game yet" });
    return;
  }
}

module.exports = leaderBoard;
