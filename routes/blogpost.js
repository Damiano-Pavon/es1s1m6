const express = require("express");
const router = express.Router();
const blogModel = require("../models/blogpost");
const CommentSchema = require("../models/comments");

router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;

  try {
    const blogpost = await blogModel.findById(id);

    if (!blogpost) {
      return res.status(404).send({
        statusCode: 404,
        message: "Blogpost not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      comments: blogpost.comments,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.get("/:id/comments/:commentId", async (req, res) => {
  const { id, commentId } = req.params;
  try {
    const blogpost = await blogModel.findById(id);

    if (!blogpost) {
      return res.status(404).json({
        statusCode: 404,
        message: "Blogpost not found",
      });
    }
    const comment = blogpost.comments.find(
      (comment) => comment._id.toString() === commentId
    );

    if (!comment) {
      return res.status(404).json({
        statusCode: 404,
        message: "Comment not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      comment,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const blogpost = await blogModel.findById(id);

    if (!blogpost) {
      return res.status(404).send({
        statusCode: 404,
        message: "Blogpost not found",
      });
    }
    const newComment = {
      text,
    };

    blogpost.comments.push(newComment);
    await blogpost.save();

    res.status(201).send({
      statusCode: 201,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.patch("/:id/comments/:commentId", async (req, res) => {
  const { id, commentId } = req.params;
  const { text } = req.body;

  try {
    const blogpost = await blogModel.findById(id);

    if (!blogpost) {
      return res.status(404).send({
        statusCode: 404,
        message: "Blogpost not found",
      });
    }

    const comment = blogpost.comments.find(
      (comment) => comment._id.toString() === commentId
    );

    if (!comment) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment not found",
      });
    }
    comment.text = text;
    await blogpost.save();
    res.status(200).send({
      statusCode: 200,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.delete("/:id/comments/:commentId", async (req, res) => {
  const { id, commentId } = req.params;

  try {
    const blogpost = await blogModel.findById(id);

    if (!blogpost) {
      return res.status(404).send({
        statusCode: 404,
        message: "Blogpost not found",
      });
    }

    const commentIndex = blogpost.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment not found",
      });
    }

    blogpost.comments.splice(commentIndex, 1);
    await blogpost.save();

    res.status(200).send({
      statusCode: 200,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.get("/", async (req, resp) => {
  try {
    const blogposts = await blogModel.find();
    resp.status(200).send(blogposts);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.post("/", async (req, resp) => {
  const newBlogpost = new blogModel({
    category: req.body.category,
    title: req.body.title,
    cover: req.body.cover,
    readTime: req.body.readTime,
    author: req.body.author,
    content: req.body.content,
    comments: req.body.comments,
  });
  try {
    const BlogpostToSave = await newBlogpost.save();
    resp.status(201).send({
      statusCode: 201,
      payload: BlogpostToSave,
    });
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.get("/:id", async (req, resp) => {
  const { id } = req.params;

  try {
    const blogPost = await blogModel.findById(id);

    if (!blogPost) {
      return resp.status(404).send({
        statusCode: 404,
        message: "The request blogpost doesn t exist!",
      });
    }
    resp.status(200).send(blogPost);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.patch("/:id", async (req, resp) => {
  const { id } = req.params;

  try {
    const blogPost = await blogModel.findById(id);
    if (!blogPost) {
      return resp.status(404).send({
        statusCode: 404,
        message: "The request blogpost doesn t exist!",
      });
    }

    const updatedData = req.body;
    const options = { new: true };

    const result = await blogModel.findByIdAndUpdate(id, updatedData, options);

    resp.status(200).send(result);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.delete("/:id", async (req, resp) => {
  const { id } = req.params;

  try {
    const blogPost = await blogModel.findByIdAndDelete(id);

    if (!blogPost) {
      return resp.status(404).send({
        statusCode: 404,
        message: "The request blogpost doesn t exist!",
      });
    }
    resp.status(200).send(`blogpost with id ${id} succesfully removed`);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = router;
