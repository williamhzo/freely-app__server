require("dotenv").config();
require("../config/dbConnection");
const Skill = require("../models/Skill");

// const skillsFile = require("./../skill_data/skills_02.json");

const skillsFile = [
  "3D Modeling",
  "Adobe Acrobat",
  "Adobe CC",
  "Adobe Illustrator",
  "Adobe InDesign",
  "Adobe Photoshop",
  "AJAX",
  "AngularJS",
  "Animated GIFs",
  "API",
  "Article Writing",
  "Automation",
  "Baking",
  "Blender",
  "Blog Writing",
  "Brand Design",
  "Brand Strategy",
  "Business Plans",
  "Business Writing",
  "Butter Churning",
  "Calligraphy",
  "CodeIgniter",
  "Content Management",
  "Content Strategy",
  "Cooking",
  "Copy Editing",
  "Copywriting",
  "Core Java",
  "CorelDRAW",
  "Creative Writing",
  "CRM",
  "CSS",
  "CSS Flexbox & Grid",
  "CSS3",
  "Data Analysis",
  "Data Entry",
  "Databases",
  "Deno",
  "Desktop Software Development",
  "Digital Asset Design",
  "Divination",
  "Django",
  "DJing",
  "Drawing",
  "E-commerce Development",
  "eBook Design",
  "eCommerce",
  "Editing",
  "Editorial Illustration",
  "Event Planning",
  "ExpressJS",
  "Figma",
  "Financial Analysis",
  "Financial Writing",
  "Flutter",
  "Food Photography",
  "Forex Trading",
  "Fundraising",
  "Game Design",
  "Game Development",
  "Ghostwriting",
  "Git",
  "Google Analytics",
  "Grant Writing",
  "Graphic Design",
  "Hand Lettering",
  "Horseback Riding",
  "Handlebars",
  "HTML",
  "HTML5",
  "Illustration",
  "Ionic Framework",
  "J2ME",
  "Java",
  "JavaScript",
  "Jingles",
  "Journalism",
  "jQuery",
  "Kindle App Development",
  "Knitting",
  "Laravel",
  "Levitation",
  "Lightspeed Retail",
  "Logo Design",
  "Logic Pro",
  "Machine Learning",
  "Magento",
  "MailChimp",
  "Market Research",
  "Microsoft Office",
  "Microsoft PowerPoint",
  "Mobile Apps",
  "Mobile Design",
  "MongoDB",
  "Mongoose",
  "Music Composition",
  "MySQL",
  "Nature Photography",
  "Necromancy",
  "NodeJS",
  "NoSQL",
  "Odoo",
  "OpenCart",
  "OpenERP Administration",
  "OpenERP Development",
  "Oracle Java EE",
  "Packaging Design",
  "Payment Gateway Integration",
  "Paypal Integration",
  "Photo Editing",
  "PHP",
  "Physics",
  "Podcast Editing",
  "Polishing Floors",
  "Portrait Photography",
  "PostgreSQL",
  "Press Release Writing",
  "Product Design",
  "Product Photography",
  "Product Research",
  "Proofreading",
  "Public Speaking",
  "Python",
  "Qt",
  "ReactJS",
  "Running",
  "SEO",
  "Shopify",
  "Sketch",
  "Ski Instruction",
  "Social Media Management",
  "Social Media Marketing",
  "Sound Effects",
  "Sound Mixing",
  "Special Effects",
  "SSL",
  "Statistics",
  "Swimming",
  "Tarot",
  "Technical Analysis",
  "Technical Translation",
  "Technical Writing",
  "Transcription",
  "Translation",
  "TypeScript",
  "User Testing",
  "UX Design",
  "UI Design",
  "Video Editing",
  "Voice Over",
  "VueJS",
  "Web Design",
  "Web Scraping",
  "Wireframing",
  "Whiteboard Explainer Videos",
  "WooCommerce",
  "WordPress",
  "Writing",
  "Zen Cart",
  "Zoom Backgrounds",
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
