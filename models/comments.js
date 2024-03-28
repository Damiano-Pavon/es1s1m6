const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, strict: true }
);

module.exports = CommentSchema;
