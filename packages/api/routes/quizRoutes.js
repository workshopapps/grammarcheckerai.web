quiz = require("express").Router();
const quizController = require("../controller/quizController");

quiz.get("/", quizController.getQuiz);
quiz.post("/", quizController.sendAnswer);


module.exports = quiz;
