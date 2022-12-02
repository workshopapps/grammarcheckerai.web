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
  io.emit("get-question", generateQuestion);
  socket.on("update-quizProfile", userQuizProfileUpdateHandler);
  socket.on("get-roundWinner", (winnerUserId) => {
    if (!winnerUserId) {
      io.emit("receive-roundWinner", () => {
        return `Time up!!! No player won this round.`;
      });
    } else {
      io.emit("receive-roundWinner", async (userId) => {
        const roundWinner = await receiveRoundWinnerHandler(
          winnerUserId,
          userId
        );
        return roundWinner;
      });
    }
  });
  socket.on("disconnect", () => {
    const count = io.engine.clientsCount;
    socket.broadcast.emit("update-players", count - 1);
  });
};

module.exports = quizFlow;
