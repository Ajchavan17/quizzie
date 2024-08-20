// models/Question.js
const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  questionText: { type: String, required: true },
  optionType: { type: String, required: true }, // Text, Image URL, or both
  options: [
    {
      text: { type: String },
      imageUrl: { type: String },
      correct: { type: Boolean, default: false },
    },
  ],
  timer: { type: Number, default: 0 }, // Timer in seconds
});

module.exports = mongoose.model("Question", QuestionSchema);
