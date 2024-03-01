const mongoose = require("mongoose");
const User=require("./User");

const defaultImageURL = "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },

    description: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
      type: String,
      default: defaultImageURL,
      validate: {
        validator: function (v) {
          // Simple URL validation regex
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: props => `${props.value} is not a valid URL!`
      }
    },
    username:{
      type:mongoose.Types.ObjectId,
      ref:"User",
      required:[true , "user id is required"],
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
