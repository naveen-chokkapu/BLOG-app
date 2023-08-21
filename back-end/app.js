const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://naveen:naveen@cluster0.lqxxjpm.mongodb.net/Blog"
);

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  about: String,
});

const user = mongoose.model("user", userSchema);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.post("/signUp", (req, res) => {
  console.log(req.body);
  const user1 = new user({
    userName: req.body.object.userName,
    email: req.body.object.email,
    password: req.body.object.password,
    about: req.body.object.about,
  });

  user1.save();
  res.send("Signup successful");
});

// app.post('/cards',(req,res)=> {
//   console.log(req.body);
//   const userpost = new user({
//     likeCount: req.body.object.likeCount,
//     comment: req.body.object.comment,
//     cardTitle: req.body.object.cardTitle,
//     cardText: req.body.object.cardText,
//   })
//   userpost.save();
//   res.send('posted successfully');
// })

app.post('/post',(req,res)=>{
  console.log(req.body);
})



app.post("/login", async (req, res) => {
  try {
    const data = await user.find({
      email: req.body.object.email,
      password: req.body.object.password,
    });
    if(data == "") res.sendStatus(205);
    else res.send(data);

  } catch (err) {
    console.log("Error at login", err);
  }
});

app.listen(5000, () => {
  console.log("Running Server");
});
