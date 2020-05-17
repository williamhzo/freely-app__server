require("dotenv").config();
require("../config/dbConnection");
const Skill = require("../models/Skill");

// const skillsFile = require("./../skill_data/skills_02.json");

const skillsFile = [
  "Running",
  "Swimming",
  "Cooking",
  "ReactJS",
  "VueJS",
  "AngularJS",
  "HTML",
  "CSS",
  "JavaScript",
  "Python",
  "Machine Learning",
  "Figma",
  "Drawing",
  "Knitting",
  "Ski Instruction",
  "Butter Churning",
  "Horseback Riding",
  "Writing",
  "Copy Editing",
  "Illustration",
  "Baking",
  "Adobe CC",
  "Calligraphy",
  "Public Speaking",
  "Levitation",
  "Necromancy",
  "Tarot",
  "Divination",
  "Physics",
  "Statistics",
  "Music Composition",
  "DJing",
  "Event Planning",
  "Zoom Backgrounds",
  "Polishing Floors",
];

Skill.deleteMany({}, function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
  skillsFile.forEach(async (skill) => {
    try {
      const skillObject = {};
      skillObject.name = skill;
      console.log(skillObject);
      const dbRes = await Skill.create(skillObject);
      console.log(dbRes);
    } catch (err) {
      console.log(err);
    }
  });
});
