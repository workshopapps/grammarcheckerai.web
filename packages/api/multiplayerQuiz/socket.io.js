const {
  startQuizHandler,
  userQuizProfileUpdateHandler,
  receiveRoundWinnerHandler,
  generateQuestion,
} = require("./quizHandlers");

const quizFlow = function (io, socket) {
  console.log(`socket ${socket.id} connected`);
  const count = io.engine.clientsCount;
  io.emit("update-players", count);
  socket.on("start-quiz", startQuizHandler);
  socket.on("get-question", async () => {
    const question = await generateQuestion();
    io.emit("receive-question", question);
  });
  socket.on("update-quizProfile", userQuizProfileUpdateHandler);
  socket.on("get-roundWinner", async (winnerUserId) => {
    if (!winnerUserId) {
      io.emit("receive-roundWinner", "Time up!!! No player won this round.");
    } else {
      const roundWinner = await receiveRoundWinnerHandler(winnerUserId);
      io.emit("receive-roundWinner", roundWinner);
    }
  });
  socket.on("disconnect", () => {
    const count = io.engine.clientsCount;
    socket.broadcast.emit("update-players", count - 1);
  });
};

module.exports = quizFlow;
