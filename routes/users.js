const express = require("express");
const router = express.Router();
const userModel = require("../models/users");

router.get("/getUsers", async (req, resp) => {
  try {
    const users = await userModel.find();
    resp.status(200).send(users);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.get("/getUsers/:id", async (req, resp) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);

    if (!user) {
      return resp.status(404).send({
        statusCode: 404,
        message: "The request user doesn t exist!",
      });
    }
    resp.status(200).send(user);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.post("/createUsers", async (req, resp) => {
  const newUser = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    avatar: req.body.avatar,
  });
  try {
    const userToSave = await newUser.save();
    resp.status(201).send({
      statusCode: 201,
      payload: userToSave,
    });
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = router;
