const axios = require("axios");

exports.getQuiz= async (req, res) => {
  var questionList = [];
  await axios
    .get("https://the-trivia-api.com/api/questions?limit=1")
    .then((question) => {
     questionList.push(question.data[0]);
    })
    .catch((err) => {
      console.log(err);
      res.send("There is a Problem, please try again");
    });
    res.status(200).send(questionList)
};

exports.sendAnswer = async (req, res) => {
  var answer = [{"answer": "correct"}];
  
  res.status(200).send(answer);
};

