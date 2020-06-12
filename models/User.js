const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//FIXME include a field with type as array of objectIDs to refer to user's post

const User = mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please enter your fullname"],
  },
  username: {
    type: String,
    required: [true, "Please enter your username"],
    unique: [true, "Username already exist"],
    minLength: [6, "Username should be of more than 5 characters"],
    maxLength: [18, "Username should be of less than 19 characters"],
    match: [/[^-\s]/, "Username cannot have space"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email ID"],
    unique: [true, "Email already exist"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
    immutable: [true, "Email cannot be changed"],
  },
  password: {
    type: String,
    select: false,
    required: [true, "Please enter your password"],
    minLength: 8,
    match: [/[^-\s]/, "Username cannot have space"],
  },
  age: {
    type: Number,
    required: [true, "Please enter your age"],
    min: [18, "Minimum age should be 18"],
  },
  state: {
    type: String,
    required: [true, "Please enter your state of residence"],
  },
  country: {
    type: String,
    required: [true, "Please enter your country of residence"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  bio: String,
  followers: {
    type: Number,
    min: [0, "Followers cannot be less than 0"],
    default: 0,
  },
  following: {
    type: Number,
    min: [0, "Following cannot be less than 0"],
    default: 0,
  },
  passwordResetToken: String,
  passwordResetExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: false,
  },
});

// Encrpyt password everytime before a document is saved (only if field 'password' is changed)
User.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hashSync(this.password, 10);
  }
  next();
});

// Create signedJWTToken and return
User.methods.getSignedJWTToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

module.exports = mongoose.model("user", User);
