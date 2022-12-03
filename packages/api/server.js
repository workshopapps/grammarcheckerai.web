const { createServer } = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const { environment } = require("./config/environment.js");

const quizFlow = require("./multiplayerQuiz/socket.io");

const { PORT, HOST, NODE_ENV } = environment;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  quizFlow(io, socket);
});

httpServer.listen(PORT, () => {
  console.log(`server running on http://${HOST}:${PORT} in ${NODE_ENV} mode`);
});
