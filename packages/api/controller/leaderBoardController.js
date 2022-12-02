const quizRanking = require("../database/models/quizRanking");

async function leaderBoard(req, res) {
  const data = await quizRanking.find().sort({ totalPoints: -1 });
  data.forEach((user, i) => {
    user.rank = i + 1;
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
