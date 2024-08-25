const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
  text: { type: String }, // Text can be optional if you want to support Image URL-only options
  url: { type: String }, // For image URL
  correct: { type: Boolean, default: false },
});

// Ensure that at least one of 'text' or 'url' is required
OptionSchema.path("text").validate(function (value) {
  return value || this.url;
}, "Either text or url must be provided.");

const QuestionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  questionText: { type: String, required: true },
  optionType: { type: String, required: true }, // Text, Image URL, or both
  options: [OptionSchema],
  timer: { type: Number, default: 0 }, // Timer in seconds
});

module.exports = mongoose.model("Question", QuestionSchema);
