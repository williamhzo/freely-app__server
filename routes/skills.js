const express = require("express");
const router = express.Router();
const Skill = require("./../models/Skill");

router.get("/", (req, res, next) => {
  Skill.find({})
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
