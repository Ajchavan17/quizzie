// routes/quiz.js
const express = require("express");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new quiz
router.post("/create", authMiddleware, async (req, res) => {
  const { name, type } = req.body;
  const userId = req.user.id;

  try {
    const quiz = new Quiz({
      name,
      type,
      user: userId,
    });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a question to a quiz
router.post("/:quizId/questions", authMiddleware, async (req, res) => {
  const { quizId } = req.params;
  const { questionText, optionType, options, timer } = req.body;

  try {
    const question = new Question({
      quiz: quizId,
      questionText,
      optionType,
      options,
      timer,
    });
    await question.save();

    const quiz = await Quiz.findById(quizId);
    quiz.questions.push(question);
    await quiz.save();

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get quizzes created by the logged-in user
router.get("/myquizzes", authMiddleware, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.user.id }).populate(
      "questions"
    );
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
