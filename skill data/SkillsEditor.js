var fs = require("fs");
var skillsRaw = require("./Skills1.json");
// var skillsProcessed = require("./SkillsProcessed.json");

// console.log(skillsRaw);

fs.readFile("./Skills1.json", function (err, data) {
  const rawData = JSON.parse(data);
  const newArray = [];
  rawData.forEach((item) => {
    newArray.push(decodeURIComponent(item));
  });
  fs.writeFile("./SkillsProcessed.json", JSON.stringify(newArray), function (
    err
  ) {
    console.log(err);
  });
});
