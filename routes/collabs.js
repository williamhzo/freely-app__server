const express = require("express");
const router = express.Router();
const Collab = require("./../models/Collab");
const User = require("../models/User");
const Category = require("../models/Category");
const Skill = require("../models/Skill");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../config/cloudinaryConfig.js");

// Get all Collabs

router.get("/", (req, res, next) => {
  Collab.find({})
    .populate({ path: "creator", model: User })
    .populate({ path: "contributors", model: User })
    .populate({ path: "skillsNeeded", model: Skill })
    .populate({ path: "categoryNeeded", model: Category })
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => console.log(err));
});

// Get one Collab

router.get("/:id", (req, res, next) => {
  Collab.findById(req.params.id)
    .populate({ path: "creator", model: User })
    .populate({ path: "contributors", model: User })
    .populate({ path: "skillsNeeded", model: Skill })
    .populate({ path: "categoryNeeded", model: Category })
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => console.log(err));
});

// Create one Collab

router.post("/", uploadCloud.single("image"), (req, res, next) => {
  Collab.create(req.body)
    .populate({ path: "creator", model: User })
    .populate({ path: "contributors", model: User })
    .populate({ path: "skillsNeeded", model: Skill })
    .populate({ path: "categoryNeeded", model: Category })
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => console.log(err));
});

// Edit one Collab

router.patch("/:id", uploadCloud.single("image"), (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.secure_url;
  } else {
    delete req.body.image;
  }
  Collab.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .populate({ path: "creator", model: User })
    .populate({ path: "contributors", model: User })
    .populate({ path: "skillsNeeded", model: Skill })
    .populate({ path: "categoryNeeded", model: Category })
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => console.log(err));
});

// Delete one Collab

router.delete("/:id", (req, res, next) => {
  Collab.findByIdAndDelete(req.params.id)
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => console.log(err));
});

module.exports = router;
