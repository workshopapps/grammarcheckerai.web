// It must be placed above all other 'require' statements
var atatus = require("atatus-nodejs");
atatus.start({
  licenseKey: "lic_apm_2c415fffd3d94ee68e8daf25b02ae5ee",
  appName: "Speakbetter",
});

const { createServer } = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

mongoose.set("strictQuery", true); // to suppress this warning the DeprecationWarning
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
