var fs = require("fs");
var readFile = "./skillsRaw.json";
var writeFile = "./skills_02.json";

fs.readFile(readFile, function (err, data) {
  const rawData = JSON.parse(data);
  const newArray = [];
  rawData.forEach((item) => {
    item = decodeURIComponent(item);
    let regex = /-/gi;
    item = item.replace(regex, " ");
    const itemArray = item.split(" ");
    const newItemArray = [];
    itemArray.forEach((word) => {
      let regex = /^[a-z]/;
      let newWord = word.replace(regex, function (match) {
        return match.toUpperCase();
      });
      newItemArray.push(newWord);
    });
    const title = newItemArray.join(" ");
    newArray.push(title);
  });
  fs.writeFile(writeFile, JSON.stringify(newArray), function (err) {
    console.log(err);
  });
});
