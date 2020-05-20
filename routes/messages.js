const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Message = require("../models/Message");

// Get one user's messages

router.get("/user/:id", (req, res, next) => {
  Message.find({ recipients: req.params.id })
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

// Get one message

router.get("/message/:id", (req, res, next) => {
  Message.findById(req.params.id)
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => res.status(500).json(err));
});

// Create one thread

router.post("/new/:id1/:id2", (req, res, next) => {
  Message.create({
    recipients: [req.params.id1, req.params.id2],
    unread: true,
    messages: [{ ...req.body, time: Date.now() }],
  })
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

// Add one message
router.post("/message/:id", (req, res, next) => {
  console.log(req.params.id);
  Message.findByIdAndUpdate(
    req.params.id,
    { $push: { messages: req.body }, unread: true },
    { new: true }
  )
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
