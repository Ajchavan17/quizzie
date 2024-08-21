const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  correct: { type: Boolean, default: false },
});

const QuestionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  questionText: { type: String, required: true },
  optionType: { type: String, required: true }, // Text, Image URL, or both
  options: [OptionSchema],
  timer: { type: Number, default: 0 }, // Timer in seconds
});

module.exports = mongoose.model("Question", QuestionSchema);
