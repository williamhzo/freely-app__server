require("dotenv").config();
require("./../config/dbConnection");
const express = require("express");
const User = require("../models/User");
const users = [
  {
    name: "Sam Littlefair",
    userName: "samlittlefair",
    email: "sam@littlefair.ca",
    password: "password",
    phone: "+1 (902) 789 2521",
    profilePicture:
      "https://source.unsplash.com/400x400/?portraithttps://images.unsplash.com/photo-1444069069008-83a57aac43ac?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=400",
    title: "Co-Founder, Shark Attack",
    bio:
      "Hey, what kinda party is this? There's no booze and only one hooker. I am the man with no name, Zapp Brannigan! Wow! A superpowers drug you can just rub onto your skin? You'd think it would be something you'd have to freebase.",
    socialLinks: [
      "http://twitter.com/samlfair",
      "http://facebook.com/samlfair",
      "http://littlefair.ca",
    ],
    location: "Halifax, Canada",
    remote: true,
    private: false,
    userCategory: ["Full Stack Web Developer", "Chef"],
    portfolio: [
      {
        image:
          "https://images.unsplash.com/photo-1588538203130-31d833e1b10e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
        title: "Bender, quit destroying the universe!",
        description:
          "Yes, except the Dave Matthews Band doesn't rock. Too much work. Let's burn it and say we dumped it in the sewer. That's the ONLY thing about being a slave. You're going to do his laundry? I had more, but you go ahead.",
        link: "http://google.com",
      },
      {
        image:
          "https://images.unsplash.com/photo-1547333590-47fae5f58d21?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
        title: "Nay, I respect and admire Harold Zoid",
        description:
          "Switzerland is small and neutral! We are more like Germany, ambitious and misunderstood!",
        link: "http://google.com",
      },
    ],
  },
  {
    name: "William Hermozo",
    userName: "williamhermozo",
    email: "williamhermozo@protonmail.com",
    password: "password",
    phone: "+375 154 571 8754",
    profilePicture:
      "https://images.unsplash.com/photo-1495462911434-be47104d70fa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=400",
    title: "Co-Founder, Shark Attack",
    bio:
      "Well, let's just dump it in the sewer and say we delivered it. Your best is an idiot! Doomsday device? Ah, now the ball's in Farnsworth's court! Fry, you can't just sit here in the dark listening to classical music.",
    socialLinks: [
      "http://twitter.com/",
      "http://linkedin.com/",
      "http://dribbble.com",
    ],
    location: "Paris, France",
    remote: true,
    private: false,
    userCategory: ["Full Stack Web Developer", "Ninja Instructor"],
    portfolio: [
      {
        image:
          "https://images.unsplash.com/photo-1584441263007-61887b7fcf03?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
        title: "For the last time, I don't like lilacs!",
        description:
          "Yeah, I do that with my stupidness. I videotape every customer that comes in here, so that I may blackmail them later.Yes, except the Dave Matthews Band doesn't rock. Too much work. Let's burn it and say we dumped it in the sewer. That's the ONLY thing about being a slave. You're going to do his laundry? I had more, but you go ahead.",
        link: "http://google.com",
      },
      {
        image:
          "https://images.unsplash.com/photo-1574577457058-5cefa266a7e8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
        title: "Your 'first' wife was the one",
        description:
          "And I'd do it again! And perhaps a third time! But that would be it. You'll have all the Slurm you can drink when you're partying with Slurms McKenzie! ",
        link: "http://google.com",
      },
      {
        image:
          "https://images.unsplash.com/photo-1533135091724-62cc5402aa20?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
        title: "Nay, I respect and admire Harold Zoid",
        description:
          "Well, let's just dump it in the sewer and say we delivered it.",
        link: "http://google.com",
      },
    ],
  },
  {
    name: "Arthur Weasley",
    userName: "arthurw",
    email: "arthur@gmail.com",
    password: "password",
    phone: "+33 93 185 8194",
    profilePicture:
      "https://images.unsplash.com/photo-1546249041-2316761d7c1c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=400",
    title: "Department of Muggles. Looking for a good time.",
    bio:
      "Interesting. No, wait, the other thing: tedious. Throw her in the brig.",
    socialLinks: [
      "http://googleplus.com/",
      "http://myspace.com/",
      "http://ello.co",
    ],
    location: "London, England",
    remote: false,
    private: true,
    userCategory: ["Wizard"],
    portfolio: [
      {
        image:
          "https://images.unsplash.com/photo-1578309793896-2a825b041f57?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
        title: "You, minion. Lift my arm.",
        description:
          "If rubbin' frozen dirt in your crotch is wrong, hey I don't wanna be right. You guys aren't Santa! You're not even robots. How dare you lie in front of Jesus? Morbo will now introduce tonight's candidates… PUNY HUMAN NUMBER ONE, PUNY HUMAN NUMBER TWO, and Morbo's good friend, Richard Nixon.",
        link: "http://google.com",
      },
    ],
  },
  {
    name: "Harry Potter",
    userName: "headauror81",
    email: "harry@gmail.com",
    password: "password",
    phone: "+91 385 910 1021",
    profilePicture:
      "https://images.unsplash.com/photo-1554651802-57f1d69a4944?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=400",
    title: "I beat Voldemort twice. What have you done?",
    bio:
      "Soothe us with sweet lies. And when we woke up, we had these bodies. Your best is an idiot! Maybe I love you so much I love you no matter who you are pretending to be. Hi, I'm a naughty nurse, and I really need someone to talk to. $9.95 a minute.",
    socialLinks: [
      "http://harrypotter.com/",
      "http://facebook.com/",
      "http://twitter.com",
    ],
    location: "London, England",
    remote: false,
    private: false,
    userCategory: ["Wizard"],
    portfolio: [
      {
        image:
          "https://images.unsplash.com/photo-1565502233555-c120d9c8190c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
        title: "When I was first asked to make a film",
        description:
          "I thought Why should I? Then later, Leela made the film. But if I did make it, you can bet there would have been more topless women on motorcycles. Roll film! You mean while I'm sleeping in it?",
        link: "http://google.com",
      },
      {
        image:
          "https://images.unsplash.com/photo-1505934333218-8fe21ff87e69?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
        title: "Okay, it's 500 dollars",
        description:
          "You've killed me! Oh, you've killed me! I had more, but you go ahead. Yes, if you make it look like an electrical fire. When you do things right, people won't be sure you've done anything at all.\nI'm sorry, guys. I never meant to hurt you. Just to destroy everything you ever believed in. When I was first asked to make a film about my nephew, Hubert Farnsworth, I thought Why should I? Then later, Leela made the film.",
        link: "http://google.com",
      },
      {
        image:
          "https://images.unsplash.com/photo-1489694553447-4c9339da310d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
        title: "Kif might!",
        description:
          " Large bet on myself in round one. A true inspiration for the children. Bender, we're trying our best.",
        link: "http://google.com",
      },
    ],
  },
  {
    name: "Hermione Granger",
    userName: "spew",
    email: "hermione@gmail.com",
    password: "password",
    phone: "+1-613-555-0171",
    profilePicture:
      "https://images.unsplash.com/photo-1521398468995-33f47b2067cc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=400",
    title:
      "Shut up and get to the point! I don't want to be rescued. Ow, my spirit!",
    bio:
      "No! I want to live! There are still too many things I don't own! Yep, I remember. They came in last at the Olympics, then retired to promote alcoholic beverages!",
    socialLinks: [
      "http://instagram.com/",
      "http://facebook.com/",
      "http://twitter.com",
    ],
    location: "Lyon, France",
    remote: false,
    private: false,
    userCategory: ["Knitter", "Ski Instructor"],
    portfolio: [
      {
        image:
          "https://images.unsplash.com/photo-1565502233555-c120d9c8190c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
        title: "She's stuck in an infinite loop",
        description:
          "I thought Why should I? Then later, Leela made the film. But if I did make it, you can bet there would have been more topless women on motorcycles. Roll film! You mean while I'm sleeping in it?",
        link: "http://google.com",
      },
      {
        image:
          "https://images.unsplash.com/photo-1578031017952-70976c101849?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
        title: "Oh no!",
        description:
          "The professor will hit me! But if Zoidberg 'fixes' it… then perhaps gifts! Now what? Ok, we'll go deliver this crate like professionals, and then we'll go ride the bumper cars. Daddy Bender, we're hungry.",
        link: "http://google.com",
      },
      {
        image:
          "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
        title: "Yep, I remember",
        description:
          "They came in last at the Olympics, then retired to promote alcoholic beverages! Why not indeed! Son, as your lawyer, I declare y'all are in a 12-piece bucket o' trouble. But I done struck you a deal: Five hours of community service cleanin' up that ol' mess you caused.",
        link: "http://google.com",
      },
    ],
  },
  {
    name: "Homer Simpson",
    userName: "homerhomer",
    email: "homer@gmail.com",
    password: "password",
    phone: "+44 1632 960891",
    profilePicture:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=400",
    title:
      "Maybe I love you so much I love you no matter who you are pretending to be. We're also Santa Claus!",
    bio:
      "Are you crazy? I can't swallow that. That's right, baby. I ain't your loverboy Flexo, the guy you love so much. You even love anyone pretending to be him!\nHey, guess what you're accessories to. Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is his wife holding up? …To shreds, you say. Is today's hectic lifestyle making you tense and impatient? \nYep, I remember. They came in last at the Olympics, then retired to promote alcoholic beverages! Too much work. Let's burn it and say we dumped it in the sewer. Shut up and get to the point! Oh yeah, good luck with that.",
    socialLinks: ["http://facebook.com/", "http://twitter.com"],
    location: "Springfield, Illinois",
    remote: true,
    private: false,
    userCategory: ["Nuclear Safety Inspector"],
    portfolio: [
      {
        image:
          "https://images.unsplash.com/photo-1549241520-425e3dfc01cb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
        title: "Who said that? SURE you can die!",
        description:
          "I thought Why should I? Then later, Leela made the film. But if I did make it, you can bet there would have been more topless women on motorcycles. Roll film! You mean while I'm sleeping in it?",
        link: "http://google.com",
      },
      {
        image:
          "https://images.unsplash.com/photo-1578031017952-70976c101849?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900",
        title: "Oh no!",
        description:
          "The professor will hit me! But if Zoidberg 'fixes' it… then perhaps gifts! Now what? Ok, we'll go deliver this crate like professionals, and then we'll go ride the bumper cars. Daddy Bender, we're hungry.",
        link: "http://google.com",
      },
    ],
  },
];

User.deleteMany({}, function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
  User.insertMany(users)
    .then((dbRes) => console.log(dbRes))
    .catch((err) => console.log(err));
});

// users.forEach((user) => {
//   console.log("foreach");
//   User.create(user)
//     .then((dbRes) => console.log(dbRes))
//     .catch((err) => console.log(err));
// });

/*

Leela's gonna kill me. Oh dear! , and he's an idiot! Well, that's love for you. I just want to talk. It has nothing to do with mating. Fry, that doesn't make sense. Interesting. No, wait, the other thing: tedious.

 You want to die?! When will that be? Yeah, lots of people did. You've killed me! Oh, you've killed me! And yet you haven't said what I told you to say! How can any of us trust you?

You don't know how to do any of those. My fellow Earthicans, as I have explained in my book 'Earth in the Balance'', and the much more popular ''Harry Potter and the Balance of Earth', we need to defend our planet against pollution. Also dark wizards.

I found what I need. And it's not friends, it's things. Ok, we'll go deliver this crate like professionals, and then we'll go ride the bumper cars. I don't want to be rescued. Say it in Russian!

And remember, don't do anything that affects anything, unless it turns out you were supposed to, in which case, for the love of God, don't not do it! Yes, if you make it look like an electrical fire. When you do things right, people won't be sure you've done anything at all.

No, of course not. It was… uh… porno. Yeah, that's it. Look, everyone wants to be like Germany, but do we really have the pure strength of 'will'? Quite possible. We live long and are celebrated poopers.

So I really am important? How I feel when I'm drunk is correct? Large bet on myself in round one. We'll need to have a look inside you with this camera. WINDMILLS DO NOT WORK THAT WAY! GOOD NIGHT! Michelle, I don't regret this, but I both rue and lament it.

Alright, let's mafia things up a bit. Joey, burn down the ship. Clamps, burn down the crew. Goodbye, cruel world. Goodbye, cruel lamp. Goodbye, cruel velvet drapes, lined with what would appear to be some sort of cruel muslin and the cute little pom-pom curtain pull cords. Cruel though they may be…

That's not soon enough! Kif, I have mated with a woman. Inform the men. Bender! Ship! Stop bickering or I'm going to come back there and change your opinions manually! Uh, is the puppy mechanical in any way?

No! The cat shelter's on to me. Whoa a real live robot; or is that some kind of cheesy New Year's costume? I'm a thing. Take me to your leader! Incidentally, you have a dime up your nose.



// assign random skills

+33 93 877 5964
+33 93 435 6926
+33 93 138 3818
+33 93 481 7662
+33 93 544 9576
+1-613-555-0187
+1-613-555-0144
+1-613-555-0186
+1-613-555-0196
+1-613-555-0101
+44 1632 960886
+44 1632 960041
+44 1632 960240
+44 1632 960839
+44 1632 960988
+91 385 111 5764
+91 385 033 5775
+91 385 041 1044
+91 385 611 5866
+91 385 513 1914

*/
