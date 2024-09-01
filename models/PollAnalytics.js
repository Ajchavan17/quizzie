const mongoose = require("mongoose");

const PollAnalyticsSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Quiz" },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Question",
  },
  options: [
    {
      optionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      selectionCount: { type: Number, default: 1 },
    },
  ],
});

module.exports = mongoose.model("PollAnalytics", PollAnalyticsSchema);
