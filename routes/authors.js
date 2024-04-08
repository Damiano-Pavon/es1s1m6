const express = require("express");
const router = express.Router();
const authorModel = require("../models/authors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const validateAuthorBody = require("../middlewares/validateAuthorBody");
const bcrypt = require("bcrypt");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const internalStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
  },
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "PT043",
    public_id: (req, file) => file.name,
  },
});

const upload = multer({ storage: internalStorage });
const cloudUpload = multer({ storage: cloudStorage });

router.post(
  "/getAuthors/uploadImg",
  upload.single("uploadImg"),
  async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    try {
      const imageUrl = req.file.filename;
      res.status(200).json({ img: `${url}/uploads/${imageUrl}` });
    } catch (error) {
      res.status(500).send({
        statusCode: 500,
        message: "File upload error",
      });
    }
  }
);

router.post(
  "/getAuthors/cloudinaryUploadImg",
  cloudUpload.single("uploadImg"),
  async (req, res) => {
    try {
      res.status(200).json({ source: req.file.path });
    } catch (e) {
      res.status(500).send({
        statusCode: 500,
        message: "File upload error",
      });
    }
  }
);

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

router.post("/createAuthors", validateAuthorBody, async (req, resp) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newAuthor = new authorModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
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
