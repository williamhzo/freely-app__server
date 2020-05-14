require("dotenv").config();
require("../config/dbConnection");
const Skill = require("../models/Skill");

const skillsFile = require("./../skill_data/skills_02.json");

Skill.deleteMany({}, function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
  skillsFile.forEach((skill) => {
    const skillObject = {};
    skillObject.name = skill;
    console.log(skillObject);
    Skill.create(skillObject)
      .then((dbRes) => console.log(dbRes))
      .catch((err) => console.log(err));
  });
});
