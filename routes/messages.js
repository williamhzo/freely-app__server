const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Message = require("../models/Message");

// Get one user's messages

router.get("/user/:id", (req, res, next) => {
  Message.find({ recipients: req.params.id })
    .populate("recipients")
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

// Get one message

router.get("/message/:id", (req, res, next) => {
  Message.findById(req.params.id)
    .populate("recipients")
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => res.status(500).json(err));
});

// Create one thread

router.post("/new/:id1/:id2", (req, res, next) => {
  Message.create({
    recipients: [req.params.id1, req.params.id2],
    unread: false,
    messages: [{ ...req.body, time: Date.now() }],
  })
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

// Add one message
router.post("/message/:id", (req, res, next) => {
  Message.findByIdAndUpdate(
    req.params.id,
    { $push: { messages: req.body }, unread: true },
    { new: true }
  )
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

// Check unread

router.get("/unread/:userid", (req, res, next) => {
  Message.find({ recipients: req.params.userid })
    .then((dbRes) => {
      let unread = false;
      if (dbRes) {
        dbRes.forEach((thread) => {
          thread.messages.shift();
          if (thread.unread) {
            let lastMessage = thread.messages[thread.messages.length - 1];
            if (lastMessage.author == req.params.userid) {
              unread = false;
            } else {
              unread = true;
            }
          }
        });
      }
      res.status(200).json(unread);
    })
    .catch((err) => res.status(500).json(err));
});

// Mark as read

router.patch("/unread/:messageid", (req, res, next) => {
  Message.findByIdAndUpdate(
    req.params.messageid,
    { unread: false },
    { new: true }
  )
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
