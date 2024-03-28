const mongoose = require("mongoose");
const CommentSchema = require("./comments");

const BlogSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    readTime: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
    },
    content: {
      type: String,
      required: false,
    },
    comments: [CommentSchema],
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("blogModel", BlogSchema, "blogpost");
