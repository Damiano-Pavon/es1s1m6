const express = require("express");
const router = express.Router();
const blogModel = require("../models/blogpost");

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
