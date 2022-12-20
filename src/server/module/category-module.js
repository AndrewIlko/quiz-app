import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  categoryName: String,
});

export default model("QuizCategory", categorySchema);
