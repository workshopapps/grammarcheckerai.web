const express = require("express");
const app = express();
const session = require("express-session");
const axios = require("axios");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "JHGF>,./?;;LJ8#$?,KL:>>>,,KJJJDHE",
    resave: true,
    saveUninitialized: true,
  })
);

//pass like this

exports.getQuiz = async (req, res) => {
  let sess = req.session;
  sess.user = req.user;
  await axios
    .get("https://the-trivia-api.com/api/questions?limit=1")
    .then((quiz) => {
      var question = quiz.data[0];
      sess.questionId = question.id;
      sess.question = question.question;
      sess.options = question.incorrectAnswers;
      sess.answer = question.correctAnswer;
      question.incorrectAnswers.push(question.correctAnswer);
      res.status(200).send(question);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        success: false,
        message: "There was a Problem, please try again",
        errorCode: err.code,
        error: err,
      });
    });
};

exports.sendAnswer = async (req, res) => {
  const answer = req.body.answer;
  var sess = req.session;
  if (!sess.question)
    return res.status(400).send("No question being responded to");
  var message = "";
  if (answer == sess.answer) {
    message = { message: "Correct answer, weldone!" };
  } else
    message = {
      message: `Incorrect answer, Correct answer is: ${sess.answer}, please try again!`,
    };
  res.status(200).send({ success: true, data: message });
  req.session.destroy();
};
