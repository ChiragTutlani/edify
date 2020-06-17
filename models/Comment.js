const mongoose = require("mongoose");
const User = require("./User");
const Post = require("./Post");

const Comment = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please enter the author"],
    immutable: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Please enter the post"],
    immutable: true,
  },
  likes: [mongoose.Schema.Types.ObjectId],
  content: {
    type: String,
    immutable: true,
    required: [true, "Please enter the content"],
    maxLength: [100, "Maximum character count is 100"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

module.exports = mongoose.model("Comment", Comment);
