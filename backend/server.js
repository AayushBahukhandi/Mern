const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes=require("./routes/auth");
const User=require('../backend/models/user')

const MONGODB_URI = `mongodb+srv://aayushpotter555:pickachu777@cluster0.tnaqd74.mongodb.net/electronicShop?retryWrites=true&w=majority`

const app = express();
app.use("/uploads/images", express.static(path.join(__dirname,"uploads", "images")));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET ,POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use((req, res, next) => {
  User.findById("64a50d41d75397ca387d4af9")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/auth", authRoutes);

mongoose.connect(MONGODB_URI).then(() => {
  console.log("MongoDB is connected")
 
  app.listen(3000);
  console.log("App is listening at port 3000");
});
