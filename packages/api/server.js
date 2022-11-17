const { app } = require("./app");
const { environment } = require("./config/environment.js");

const { PORT, HOST, NODE_ENV } = environment;

app.listen(3000, () => {
  console.log(`server running on ${HOST}:${PORT} in ${NODE_ENV} mode`);
});
