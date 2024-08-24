const mongoose = require("mongoose");

const QuestionAnalyticsSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Quiz" },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Question",
  },
  attempts: { type: Number, default: 0 },
  correctAnswers: { type: Number, default: 0 },
  incorrectAnswers: { type: Number, default: 0 },
});

module.exports = mongoose.model("QuestionAnalytics", QuestionAnalyticsSchema);
