const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Category = require("../models/Category");
const Skill = require("../models/Skill");
const Collab = require("../models/Collab");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../config/cloudinaryConfig.js");
const updateFilters = require("./../bin/updateFilters.js");

// Get all users

router.get("/", (req, res, next) => {
  User.find(req.query)
    .populate({ path: "userCategory", model: Category })
    .populate({ path: "userSkills", model: Skill })
    .populate({ path: "userCollab", model: Collab })
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

// Create one user

router.post("/", uploadCloud.single("image"), (req, res, next) => {
  User.create(req.body)
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

// Get one user

router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .populate({ path: "userCategory", model: Category })
    .populate({ path: "userSkills", model: Skill })
    .populate({ path: "userCollab", model: Collab })
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => console.log(err));
});

// Edit one user

router.patch("/:id", uploadCloud.any(), (req, res, next) => {
  if (req.body.portfolio) {
    req.body.portfolio = JSON.parse(req.body.portfolio);
  }
  if (req.body.userCategory) {
    req.body.userCategory = JSON.parse(req.body.userCategory);
  }
  if (req.body.userSkills) {
    req.body.userSkills = JSON.parse(req.body.userSkills);
  }
  if (req.body.userCollab) {
    req.body.userCollab = JSON.parse(req.body.userCollab);
  }
  if (req.files) {
    req.files.forEach((file) => {
      switch (file.fieldname) {
        case "portfolio0":
          req.body.portfolio[0].image = file.secure_url;
          break;
        case "portfolio1":
          req.body.portfolio[1].image = file.secure_url;
          break;
        case "portfolio2":
          req.body.portfolio[2].image = file.secure_url;
          break;
        case "profilePicture":
          req.body.profilePicture = file.secure_url;
          break;
      }
    });
    // console.log(req.files);
    console.log(req.body);
    // req.body.profilePicture = req.file.secure_url;
  }
  User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .populate({ path: "userCategory", model: Category })
    .populate({ path: "userSkills", model: Skill })
    .populate({ path: "userCollab", model: Collab })
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => console.log(err));
  updateFilters.categories();
  if (req.body.userSkills) {
    updateFilters.skills();
    updateFilters.skills();
  }
  if (req.body.userCategory) {
  }
});

// Delete one user

router.delete("/:id", (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => console.log(err));
});

module.exports = router;
