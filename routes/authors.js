const express = require("express");
const router = express.Router();
const authorModel = require("../models/authors");

router.get("/getAuthors", async (req, resp) => {
  try {
    const authors = await authorModel.find();
    resp.status(200).send(authors);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.get("/getAuthors/:id", async (req, resp) => {
  const { id } = req.params;

  try {
    const author = await authorModel.findById(id);

    if (!author) {
      return resp.status(404).send({
        statusCode: 404,
        message: "The request author doesn t exist!",
      });
    }
    resp.status(200).send(author);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.post("/createAuthors", async (req, resp) => {
  const newAuthor = new authorModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    avatar: req.body.avatar,
  });
  try {
    const authorToSave = await newAuthor.save();
    resp.status(201).send({
      statusCode: 201,
      payload: authorToSave,
    });
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.patch("/updateAuthor/:id", async (req, resp) => {
  const { id } = req.params;

  try {
    const author = await authorModel.findById(id);
    if (!author) {
      return resp.status(404).send({
        statusCode: 404,
        message: "The request author doesn t exist!",
      });
    }

    const updatedData = req.body;
    const options = { new: true };

    const result = await authorModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    resp.status(200).send(result);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.delete("/deleteAuthors/:id", async (req, resp) => {
  const { id } = req.params;

  try {
    const author = await authorModel.findByIdAndDelete(id);

    if (!author) {
      return resp.status(404).send({
        statusCode: 404,
        message: "The request author doesn t exist!",
      });
    }
    resp.status(200).send(`Author with id ${id} succesfully removed`);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = router;
