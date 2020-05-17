const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillSchema = new Schema({
  name: { type: String, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  currentlyInUse: Boolean,
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
