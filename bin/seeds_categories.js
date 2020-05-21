require("dotenv").config();
require("../config/dbConnection");
const Category = require("../models/Category");
const Skill = require("../models/Skill");
let skills;

const randomSkill = (skills) => {
  let skill = skills[Math.floor(Math.random() * skills.length)];
  return skill._id;
};

const categoryArray = [
  "Freelancer",
  "Accountant",
  "Advertising Specialist",
  "Android Developer",
  "Animator",
  "App Designer",
  "App Developer",
  "Artist",
  "Artistic Director",
  "Back-End Developer",
  "Brand Designer",
  "Cartoonist",
  "Character Artist",
  "Content Creator",
  "Content Marketer",
  "Content Strategist",
  "Copywriter",
  "Data Analyst",
  "Data Scientist",
  "Designer",
  "Dev Ops",
  "Digital Marketer",
  "Editor",
  "Entrepreneur",
  "Front-End Developer",
  "Full-Stack Web Developer",
  "Game Designer",
  "Ghostwriter",
  "Graphic Designer",
  "Illustrator",
  "iOS Developer",
  "Journalist",
  "Knitter",
  "Market Researcher",
  "Marketer",
  "Marketing Strategist",
  "Mobile Developer",
  "Motion Designer",
  "Packaging Designer",
  "Photo Editor",
  "Photographer",
  "Podcaster",
  "PR Specialist",
  "Product Designer",
  "Product Owner",
  "Product Manager",
  "Product Strategist",
  "Project Coordinator",
  "Project Manager",
  "Researcher",
  "Sales Expert",
  "Ski Instructor",
  "Social Media Manager",
  "Software Engineer",
  "Tax Accountant",
  "Transcriptionist",
  "Translator",
  "UX/UI Designer",
  "Video Editor",
  "Videographer",
  "Visual Researcher",
  "Voice Actor",
  "Website Designer",
  "Web Developer",
  "Writer",
];

const categories = categoryArray.map((category) => {
  const object = { name: category };
  return object;
});

// console.log(categories);

async function seedCategories() {
  try {
    const skills = await Skill.find({});
    await Category.deleteMany({});
    categories.forEach(async (category) => {
      try {
        // category.skills = [
        //   randomSkill(skills),
        //   randomSkill(skills),
        //   randomSkill(skills),
        // ];
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
