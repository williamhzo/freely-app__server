const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collabSchema = new Schema({
  title: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  contributors: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  description: String,
  skillsNeeded: [
    {
      type: Schema.Types.ObjectId,
      ref: "Skills",
    },
  ],
  categoryNeeded: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  image: {
    type: String,
    default:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  open: Boolean,
});

const Collab = mongoose.model("Collab", collabSchema);

module.exports = Collab;
