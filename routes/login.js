const express = require("express");
const login = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authorModel = require("../models/authors");
const authors = require("../models/authors");

login.post("/login", async (req, res) => {
  try {
    const author = await authorModel.findOne({
      email: req.body.email,
    });
    if (!author) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "this author not exist" });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      author.password
    );
    if (!isPasswordValid) {
      return res.status(401).send({
        statusCode: 401,
        message: "unauthorized",
      });
    }
    const token = jwt.sign(
      {
        firstName: author.firstName,
        lastName: author.lastName,

        email: author.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );
    res
      .header("Authorization", token)
      .status(200)
      .send({ message: "login succesful", statusCode: 200, token });
  } catch (e) {
    res.status(500).send({ message: "internal server error" });
  }
});

module.exports = login;
