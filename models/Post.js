const mongoose = require("mongoose");
const User = require("./User");

//FIXME include field 'comments' referring to id of comments

const Post = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please enter the author"],
    immutable: true,
  },
  likes: [mongoose.Schema.Types.ObjectId],
  views: [mongoose.Schema.Types.ObjectId],
  title: {
    type: String,
    maxLength: 150,
    immutable: true,
    required: [true, "Please enter the title"],
  },
  content: {
    type: String,
    immutable: true,
    required: [true, "Please enter the content"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  categories: {
    type: [String],
    immutable: true,
    required: [true, "Please enter categories"],
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

Post.post("save", async function (doc) {
  const authorId = this.author;
  let user = await User.findById(authorId);
  user.posts.push(this._id);
  try {
    user = await User.findByIdAndUpdate(authorId, user, {
      runValidators: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = mongoose.model("Post", Post);
