const express = require("express");
const router = express.Router();
const Collab = require("./../models/Collab");
const User = require("../models/User");
const Category = require("../models/Category");
const Skill = require("../models/Skill");
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../config/cloudinaryConfig.js");

function updateUsers(collab, contributors) {
  User.find({ userCollab: collab }).then((dbRes) => {
    // remove old contributors from array
    dbRes.forEach((user) => {
      if (!contributors.includes(user)) {
        let slicedCollabs = [...user.userCollab].filter(
          (item) => item != collab
        );
        User.findByIdAndUpdate(user._id, {
          userCollab: slicedCollabs,
        });
      }
    });
    // add new contributors to array
    contributors.forEach((contributor) => {
      User.findById(contributor).then((dbRes) => {
        if (!dbRes.userCollab.includes(collab)) {
          User.findByIdAndUpdate(
            contributor,
            { $push: { userCollab: collab } },
            { safe: true, upsert: true },
            function (err) {
              err && console.log(err);
            }
          );
        }
      });
    });
  });
}

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
  if (req.body.contributors) {
    req.body.contributors = JSON.parse(req.body.contributors);
  }
  if (req.body.skillsNeeded) {
    req.body.skillsNeeded = JSON.parse(req.body.skillsNeeded);
  }
  if (req.body.categoryNeeded) {
    req.body.categoryNeeded = JSON.parse(req.body.categoryNeeded);
  }
  if (req.file) {
    req.body.image = req.file.secure_url;
  } else {
    delete req.body.image;
  }
  Collab.create(req.body)
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => console.log(err));
});

// Edit one Collab

router.patch("/:id", uploadCloud.single("image"), (req, res, next) => {
  if (req.body.contributors) {
    req.body.contributors = JSON.parse(req.body.contributors);
    updateUsers(req.params.id, req.body.contributors);
  }
  if (req.body.skillsNeeded) {
    req.body.skillsNeeded = JSON.parse(req.body.skillsNeeded);
  }
  if (req.body.categoryNeeded) {
    req.body.categoryNeeded = JSON.parse(req.body.categoryNeeded);
  }
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
