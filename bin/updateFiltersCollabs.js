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
  Collab.find({})
    .then((dbRes) => {
      dbRes.forEach((collab) => {
        collab.categoryNeeded.forEach((category) => {
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
              !category.currentlyInUseOnCollabs
            ) {
              Category.findByIdAndUpdate(category._id, {
                currentlyInUseOnCollabs: true,
              })
                .then((dbRes) => null)
                .catch((err) => console.log(err));
            } else if (category.currentlyInUseOnCollabs) {
              Category.findByIdAndUpdate(category._id, {
                currentlyInUseOnCollabs: false,
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
  Collab.find({})
    .then((dbRes) => {
      dbRes.forEach((collab) => {
        collab.skillsNeeded.forEach((skill) => {
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
              !skill.currentlyInUseOnCollabs
            ) {
              Skill.findByIdAndUpdate(skill._id, {
                currentlyInUseOnCollabs: true,
              })
                .then((dbRes) => null)
                .catch((err) => console.log(err));
            } else if (skill.currentlyInUseOnCollabs) {
              Skill.findByIdAndUpdate(skill._id, {
                currentlyInUseOnCollabs: false,
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

module.exports = { skills, categories };
