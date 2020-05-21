const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const bcrypt = require('bcrypt');
const User = require('../models/User');
=======
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Category = require("../models/Category");
>>>>>>> sam

const salt = 10;

router.post('/signin', (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((userDocument) => {
    if (!userDocument) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isValidPassword = bcrypt.compareSync(password, userDocument.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const userObj = userDocument.toObject();
    delete userObj.password;
    req.session.currentUser = userObj;
    res.status(200).json(userObj);
  });
});

router.post('/signup', (req, res, next) => {
  let category = await Category.find({ name: "Freelancer" });
  req.body.userCategory = [category[0]._id];
  const { email, password, userName, name, userCategory } = req.body;
  if (password.length < 5) {
    return res.status(400).json({ message: 'Password is too short' });
  }
  User.findOne({ email, userName }).then((userDocument) => {
    console.log('userDocument: ', userDocument.email);
    if (userDocument.email === email) {
      return res.status(400).json({ message: 'Email already taken' });
    } else if (userDocument.userName === userName) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = {
      email,
      name,
      userName,
      password: hashedPassword,
      userCategory,
    };

    User.create(newUser).then((newUserDocument) => {
      const userObj = newUserDocument.toObject();
      delete userObj.password;
      req.session.currentUser = userObj;
      res.status(201).json(userObj);
    });
  });
});

router.get('/isLoggedIn', (req, res, next) => {
  if (req.session.currentUser) {
    const id = req.session.currentUser._id;
    User.findById(id)
      .then((userDocument) => {
        const userObj = userDocument.toObject();
        delete userObj.password;
        res.status(200).json(userObj);
      })
      .catch((error) => {
        res.status(401).json(error);
      });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(function (error) {
    if (error) res.status(500).json(error);
    else res.status(200).json({ message: 'Successfully disconnected.' });
  });
});

module.exports = router;
