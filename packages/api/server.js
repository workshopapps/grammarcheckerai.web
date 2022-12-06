const { createServer } = require("http");
const { Server } = require("socket.io");
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

const app = require("./app");
const { environment } = require("./config/environment.js");
Sentry.init({
  dsn: "https://b7ec4b5cbc6844ecb1af364fb81b308f@o4504276798144512.ingest.sentry.io/4504276833730561",

  environment: params.INSTANCE_NAME,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,

});

app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

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
app.use(Sentry.Handlers.errorHandler());
httpServer.listen(PORT, () => {
  console.log(`server running on http://${HOST}:${PORT} in ${NODE_ENV} mode`);
});
