const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Skills = require('./Skills')
const Collabs = require('./Collabs')

const userSchema = new Schema({
  name: { type: String, required: true }
  userName: { type: String, required: true }
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: Number,
  profilePicture: {type: String, default: 'https://image.flaticon.com/icons/png/512/1738/1738760.png'},
  title: String,
  bio: String,
  socialLinks: [String],
  location: String,
  formattedLocation: String,
  remote: Boolean,
  private: Boolean,
  portfolio:{
    image:{type: String, default:'https://images.pexels.com/photos/3850200/pexels-photo-3850200.jpeg?cs=srgb&dl=modern-workplace-with-gadgets-and-notebook-on-marble-table-3850200.jpg&fm=jpg'},
    description: String,
    title: String,
    link: String,
  },
  id_skills: {
    type: Schema.Types.ObjectId,
    ref: 'Skills',
  },
  id_collabs: {
    type: Schema.Types.ObjectId,
    ref: 'Collabs',
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;