const express = require("express");
const router = express.Router();
const PollAnalytics = require("../models/PollAnalytics");
const QuestionAnalytics = require("../models/QuestionAnalytics");

// POST endpoint for Q&A analytics
router.post("/quiz/:quizId/qa", async (req, res) => {
  const { quizId } = req.params;
  const { questions } = req.body;

  try {
    for (const question of questions) {
      const { questionId, isCorrect } = question;

      let analytics = await QuestionAnalytics.findOne({ quizId, questionId });

      if (!analytics) {
        analytics = new QuestionAnalytics({
          quizId,
          questionId,
          attempts: 0,
          correctAnswers: 0,
          incorrectAnswers: 0,
        });
      }

      analytics.attempts += 1;
      if (isCorrect) {
        analytics.correctAnswers += 1;
      } else {
        analytics.incorrectAnswers += 1;
      }

      await analytics.save();
    }

    res.status(200).json({ message: "Q&A analytics updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET endpoint for Q&A analytics
router.get("/quiz/:quizId/qa", async (req, res) => {
  const { quizId } = req.params;

  try {
    const analytics = await QuestionAnalytics.find({ quizId });
    res.status(200).json(analytics);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST endpoint for Poll analytics
router.post("/quiz/:quizId/poll", async (req, res) => {
  const { quizId } = req.params;
  const { questions } = req.body;

  try {
    for (const question of questions) {
      const { questionId, selectedOptionId } = question;

      let pollAnalytics = await PollAnalytics.findOne({ quizId, questionId });

      if (!pollAnalytics) {
        pollAnalytics = new PollAnalytics({
          quizId,
          questionId,
          options: [],
        });
      }

      let option = pollAnalytics.options.find(
        (opt) => opt.optionId === selectedOptionId
      );

      if (!option) {
        option = { optionId: selectedOptionId, selectionCount: 0 };
        pollAnalytics.options.push(option);
      }

      option.selectionCount += 1;

      await pollAnalytics.save();
    }

    res.status(200).json({ message: "Poll analytics updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET endpoint for Poll analytics
router.get("/quiz/:quizId/poll", async (req, res) => {
  const { quizId } = req.params;

  try {
    const analytics = await PollAnalytics.find({ quizId });
    res.status(200).json(analytics);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
