cors = require("cors");
exports.cors = cors({
    origin: ["http://127.0.0.1:5173"],
    optionsSuccessStatus: 200,
});