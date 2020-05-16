const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Category = require('../models/Category');
const Skill = require('../models/Skill');
const Collab = require('../models/Collab');
const multer = require('multer');
const upload = multer();
const uploadCloud = require('../config/cloudinaryConfig.js');

// Get all users

router.get('/', (req, res, next) => {
  console.log(req.query);
  User.find(req.query)
    .populate({ path: 'userCategory', model: Category })
    .populate({ path: 'userSkills', model: Skill })
    .populate({ path: 'userCollab', model: Collab })
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

// Frank's comment to pre-filter the response before sending to Front-End
//.find().select(field) to remove objects (hassPss)

// Create one user

router.post('/', uploadCloud.single('image'), (req, res, next) => {
  User.create(req.body)
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => res.status(500).json(err));
});

// Get one user

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .populate({ path: 'userCategory', model: Category })
    .populate({ path: 'userSkills', model: Skill })
    .populate({ path: 'userCollab', model: Collab })
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => console.log(err));
});

// Edit one user

router.patch('/:id', uploadCloud.single('image'), (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.secure_url;
  } else {
    delete req.body.image;
  }
  User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .populate({ path: 'userCategory', model: Category })
    .populate({ path: 'userSkills', model: Skill })
    .populate({ path: 'userCollab', model: Collab })
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => console.log(err));
});

// Delete one user

router.delete('/:id', (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((dbRes) => res.status(200).json(dbRes))
    .catch((err) => console.log(err));
});

module.exports = router;
