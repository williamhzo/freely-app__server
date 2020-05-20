const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  recipients: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  unread: Boolean,
  messages: [
    {
      time: Date,
      author: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      content: String,
    },
  ],
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
