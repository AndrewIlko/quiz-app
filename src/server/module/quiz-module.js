import { Schema, model } from "mongoose";

const quizSchema = new Schema({
  quetion: String,
  options: [String],
  correctOption: String,
});

export default model("Quiz", quizSchema);
