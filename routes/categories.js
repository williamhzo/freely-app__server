const express = require("express");
const router = express.Router();
const Category = require("./../models/Category");
const Skill = require("./../models/Skill");

router.get("/", (req, res, next) => {
  Category.find({})
    .populate({ path: "skills", model: Skill })
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
