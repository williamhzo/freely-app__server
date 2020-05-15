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
