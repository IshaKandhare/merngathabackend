// models/User.js
const mongoose = require("mongoose");
const Article = require("./Article");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    articles: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Article",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
