const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: String,
  profilePicture: {
    type: String,
    default: '../public/media/avatar__blacknwhite.png',
  },
  title: String,
  bio: String,
  socialLinks: [String],
  location: String,
  formattedLocation: String,
  remote: Boolean,
  private: Boolean,
  portfolio: [
    {
      image: {
        type: String,
        default:
          'https://images.pexels.com/photos/3850200/pexels-photo-3850200.jpeg?cs=srgb&dl=modern-workplace-with-gadgets-and-notebook-on-marble-table-3850200.jpg&fm=jpg',
      },
      description: String,
      title: String,
      link: String,
    },
  ],
  userCategory: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  userSkills: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Skills',
    },
  ],
  userCollab: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Collabs',
    },
  ],
  openToProjects: Boolean,
  preferredContact: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
