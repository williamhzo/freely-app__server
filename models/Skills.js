const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
  name: { type: String, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
});

const Skills = mongoose.model('Skills', skillSchema);

module.exports = Skills;
