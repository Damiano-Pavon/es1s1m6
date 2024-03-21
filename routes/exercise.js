const express = require("express");
const router = express.Router();
const exerciseModel = require("../models/exercise");

router.get("/", async (req, resp) => {
  try {
    const exercise = await exerciseModel.find();
    resp.status(200).send(exercise);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.get("/isActive", async (req, resp) => {
  try {
    const exercise = await exerciseModel.find({ isActive: true });
    resp.status(200).send(exercise);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.get("/26", async (req, resp) => {
  try {
    const exercise = await exerciseModel.find({ age: { $gt: 26 } });
    resp.status(200).send(exercise);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.get("/26e30", async (req, resp) => {
  try {
    const exercise = await exerciseModel.find({ age: { $gt: 26, $lte: 30 } });
    resp.status(200).send(exercise);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.get("/brownblue", async (req, resp) => {
  try {
    const exercise = await exerciseModel.find({
      eyeColor: { $in: ["brown", "blue"] },
    });
    resp.status(200).send(exercise);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.get("/green", async (req, resp) => {
  try {
    const exercise = await exerciseModel.find({ eyeColor: "green" });
    resp.status(200).send(exercise);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.get("/nogreen-noblue", async (req, resp) => {
  try {
    const exercise = await exerciseModel.find({
      eyeColor: { $nin: ["green", "blue"] },
    });
    resp.status(200).send(exercise);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

router.get("/company", async (req, resp) => {
  try {
    const exercise = await exerciseModel.find({ company: "FITCORE" });
    resp.status(200).send(exercise);
  } catch (e) {
    resp.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = router;
