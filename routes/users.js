const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Category = require("../models/Category");
const Skill = require("../models/Skill");
const Collab = require("../models/Collab");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../config/cloudinaryConfig.js");
const updateFiltersUsers = require("../bin/updateFiltersUsers.js");

// Get all users

router.get("/", (req, res, next) => {
  User.find(req.query)
    .select("-password -phone")
    .populate({ path: "userCategory", model: Category })
    .populate({ path: "userSkills", model: Skill })
    .populate({ path: "userCollab", model: Collab })
    .then((dbRes) => {
      if (req.session.currentUser._id == dbRes[0]._id) {
        res.status(200).json(dbRes);
      } else {
        dbRes[0].email = null;
        res.status(200).json(dbRes);
      }
    })
    .catch((err) => res.status(500).json(err));
});

// Create one user

router.post("/", uploadCloud.single("image"), (req, res, next) => {
  User.create(req.body)
    .then((dbResNewUser) => {
      // set default category to "freelancer"
      Category.find({ name: "Freelancer" }).then((dbResFreelancer) => {
        User.findByIdAndUpdate(
          dbResNewUser._id,
          { userCategory: dbResFreelancer._id },
          { new: true }
        ).then((dbResUpdatedUser) => {
          res.status(200).json(dbResUpdatedUser);
        });
      });
      // res.status(200).json(dbResNewUser);
    })
    .catch((err) => res.status(500).json(err));
});

// Get one user

router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .populate({ path: "userCategory", model: Category })
    .populate({ path: "userSkills", model: Skill })
    .populate({ path: "userCollab", model: Collab })
    .then((dbRes) => {
      dbRes.password = null;
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
  }
  User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .populate({ path: "userCategory", model: Category })
    .populate({ path: "userSkills", model: Skill })
    .populate({ path: "userCollab", model: Collab })
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => console.log(err));
  if (req.body.userSkills) {
    updateFiltersUsers.skills();
  }
  if (req.body.userCategory) {
    updateFiltersUsers.categories();
  }
});

// Delete one user

router.delete("/:id", (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => console.log(err));
});

module.exports = router;
