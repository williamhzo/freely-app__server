const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../config/cloudinaryConfig.js");

// Get all users

router.get("/", (req, res, next) => {
  User.find({})
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => console.log(err));
});

// Get one user

router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => console.log(err));
});

// Show one user edit page

router.get("/:id/edit", (req, res, next) => {
  User.findById(req.params.id)
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => console.log(err));
});

// Edit one user

router.patch("/:id", uploadCloud.single("image"), (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.secure_url;
  } else {
    delete req.body.image;
  }
  User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => console.log(err));
});

// Delete one user

router.delete("/:id", (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => console.log(err));
});

module.exports = router;
