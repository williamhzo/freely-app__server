require("dotenv").config();
require("../config/dbConnection");
const Collab = require("../models/Collab");
const User = require("../models/User");
const Skill = require("../models/Skill");
const Category = require("../models/Category");

let allCategories = [];

const categories = () => {
  console.log("Categories");
  let allCategories = [];
  User.find({})
    .then((dbRes) => {
      dbRes.forEach((user) => {
        user.userCategory.forEach((category) => {
          if (!allCategories.includes(category._id)) {
            allCategories.push(category._id);
          }
        });
      });
      allCategories = JSON.parse(JSON.stringify(allCategories));
      Category.find({})
        .then((dbRes) => {
          dbRes.forEach((category) => {
            if (
              allCategories.includes(
                JSON.parse(JSON.stringify(category._id))
              ) &&
              !category.currentlyInUse
            ) {
              Category.findByIdAndUpdate(category._id, {
                currentlyInUse: true,
              })
                .then((dbRes) => null)
                .catch((err) => console.log(err));
            } else if (category.currentlyInUse) {
              Category.findByIdAndUpdate(category._id, {
                currentlyInUse: false,
              })
                .then((dbRes) => null)
                .catch((err) => console.log(err));
            }
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const skills = () => {
  let allSkills = [];
  User.find({})
    .then((dbRes) => {
      dbRes.forEach((user) => {
        user.userSkills.forEach((skill) => {
          if (!allSkills.includes(skill._id)) {
            allSkills.push(skill._id);
          }
        });
      });
      allSkills = JSON.parse(JSON.stringify(allSkills));
      Skill.find({})
        .then((dbRes) => {
          dbRes.forEach((skill) => {
            if (
              allSkills.includes(JSON.parse(JSON.stringify(skill._id))) &&
              !skill.currentlyInUse
            ) {
              Skill.findByIdAndUpdate(skill._id, { currentlyInUse: true })
                .then((dbRes) => null)
                .catch((err) => console.log(err));
            } else if (skill.currentlyInUse) {
              Skill.findByIdAndUpdate(skill._id, { currentlyInUse: false })
                .then((dbRes) => null)
                .catch((err) => console.log(err));
            }
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

module.exports = { skills, categories };
