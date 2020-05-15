require("dotenv").config();
require("../config/dbConnection");
const Collab = require("../models/Collab");
const User = require("../models/User");
const Skill = require("../models/Skill");
const Category = require("../models/Category");
let users;
let skills;
let categories;

const randomUser = (users) => {
  let user = users[Math.floor(Math.random() * users.length)];
  return user._id;
};

const randomSkill = (skills) => {
  let skill = skills[Math.floor(Math.random() * skills.length)];
  return skill._id;
};

const randomCategory = (categories) => {
  let category = categories[Math.floor(Math.random() * categories.length)];
  return category._id;
};

const collabs = [
  {
    title: "Cool Idea",
    description: "Yeah, I do that with my stupidness",
    image:
      "https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
    open: true,
  },
  {
    title: "Doomsday device",
    description:
      "Say it in Russian! Bite my shiny metal ass. Maybe I love you so much I love you no matter who you are pretending to be. I'm just glad my fat, ugly mama isn't alive to see this day.",
    image:
      "https://images.unsplash.com/photo-1448932133140-b4045783ed9e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
    open: true,
  },
  {
    title: "I barely knew Philip",
    description:
      "Oh, how I wish I could believe or understand that! There's only one reasonable course of action now: kill Flexo! Soon enough.",
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
    open: true,
  },
  {
    title: "Fry, we have a crate to deliver",
    description:
      "Oh right. I forgot about the battle. Yep, I remember. They came in last at the Olympics, then retired to promote alcoholic beverages! Maybe I love you so much I love you no matter who you are pretending to be.",
    image:
      "https://images.unsplash.com/photo-1477120206578-46b3ca98a4e2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
    open: true,
  },
  {
    title: "The key to victory is discipline",
    description:
      "Yep, I remember. They came in last at the Olympics, then retired to promote alcoholic beverages! I love you, buddy! Robot 1-X, save my friends! And Zoidberg! I love this planet! I've got wealth, fame, and access to the depths of sleaze that those things bring.",
    image:
      "https://images.unsplash.com/photo-1501681506726-610246d81ade?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
    open: true,
  },
  {
    title: "Straighten your pope hat",
    description:
      "I'm sorry, guys. I never meant to hurt you. Just to destroy everything you ever believed in.",
    image:
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
    open: true,
  },
  {
    title: "Good news, everyone!",
    description: "Pansy. In your time, yes, but nowadays shut up!",
    image:
      "https://images.unsplash.com/photo-1581345628965-064148e704a5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
    open: true,
  },
];

async function seedCollabs() {
  try {
    await Collab.deleteMany({}, (err, res) => console.log(err, res));
    let skills = await Skill.find({});
    let categories = await Category.find({});
    let users = await User.find({});
    collabs.forEach(async (collab, index) => {
      collab.contributors = [];
      collab.skillsNeeded = [];
      collab.categoryNeeded = [];
      collab.creator = randomUser(users);
      collab.contributors.push(randomUser(users));
      if (index % 2 > 0) collab.contributors.push(randomUser(users));
      if (index % 3 > 1) collab.contributors.push(randomUser(users));
      collab.skillsNeeded.push(randomSkill(skills));
      collab.skillsNeeded.push(randomSkill(skills));
      collab.skillsNeeded.push(randomSkill(skills));
      collab.categoryNeeded.push(randomCategory(categories));
      if (index % 2 === 0)
        collab.categoryNeeded.push(randomCategory(categories));
      const dbRes = await Collab.create(collab);
      console.log(dbRes);
    });
  } catch (err) {
    console.log(err);
  }
}

seedCollabs();
