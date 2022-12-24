import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  categoryName: String,
  tests: [String],
  image: String,
});

export default model("categories", categorySchema);
