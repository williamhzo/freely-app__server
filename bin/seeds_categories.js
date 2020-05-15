require("dotenv").config();
require("../config/dbConnection");
const Category = require("../models/Category");
const Skill = require("../models/Skill");
let skills;

const randomSkill = (skills) => {
  let skill = skills[Math.floor(Math.random() * skills.length)];
  return skill._id;
};

const categories = [
  {
    name: "Web Developer",
  },
  {
    name: "Designer",
  },
  {
    name: "Ski Instructor",
  },
  {
    name: "Marketer",
  },
  {
    name: "Knitter",
  },
  {
    name: "Writer",
  },
  {
    name: "Editor",
  },
  {
    name: "Social Media Manager",
  },
];

async function seedCategories() {
  try {
    const skills = await Skill.find({});
    await Category.deleteMany({});
    categories.forEach(async (category) => {
      try {
        category.skills = [
          randomSkill(skills),
          randomSkill(skills),
          randomSkill(skills),
        ];
        const dbRes = await Category.create(category);
        console.log(dbRes);
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

seedCategories();
