const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
  skills: [
    {
      type: Schema.Types.ObjectId,
      ref: "Skills",
    },
  ],
  currentlyInUse: Boolean,
  currentlyInUseOnCollabs: Boolean,
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
