const bcrypt=require('bcryptjs')
const nodemailer=require('nodemailer');
const crypto=require('crypto')
const jwt = require('jsonwebtoken')

const transporter=nodemailer.createTransport({
  service:'Gmail',
  auth:{
    user:'aayushpotter555@gmail.com',  //put your mail id here
    pass:'uvwlvfrgwvghfrbs'   //put password(of nodemailer I think)
  }
})

const User=require('../models/user')

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("Account does not exist");
    }

    let isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) {
      const token = jwt.sign(
        { userId: user._id, email: user.email, isAdmin: user.isAdmin },
        "Secret Key",
        { expiresIn: "3h" }
      );
      res.status(200).json({ token, isAdmin: user.isAdmin }); // Include isAdmin value in the response
    } else {
      res.status(401).json("Invalid  password");
    }
  } catch (err) {
    res.status(500).json("server error");
  }
};

    
  

// exports.postLogout = (req, res, next) => {
//   // Clear the 'token' from the client-side local storage
//   res.locals.clearToken = true;

//   // Send response indicating successful logout
//   res.json({ success: true });
// };


exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage:req.flash('error')[0]
  });
};

exports.postSignup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email: email });
    if (userDoc) {
      res.status(409).json("Account already exists");
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const userCount = await User.countDocuments();
    const isAdmin = userCount === 0; // Set isAdmin to true for the first user, false for others

    const user = await User.create({ email, password: hashedPassword, isAdmin });
    console.log(user);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json("Unable to create Account");
  }
};

exports.getReset = (req, res, next) => {
  res.render("auth/reset", {
    path: "/signup",
    pageTitle: "Reset Password",
    errorMessage:req.flash('error')[0]
  });
};

exports.postReset=async(req,res,next)=>{
  const email=req.body.email;
  try{
    let user= await User.findOne({email:email});
    if(!user){
      return res.status(401).json("Account does not exist");
    }
      const token = crypto.randomBytes(32).toString("hex")
      user.resetToken=token;
      user.resetTokenExpiration=Date.now() + 360000; 
      user= await user.save(); 
    if(user){
      const mailSent=await transporter.sendMail({
        from:'aayushpotter555@gmail.com',  //put your mail id
        to:email,
        subject:'Reset Password',
        html:`
        <h1>You have requested for Resetting Password</h1>
        <p>Click on this <a href='http://localhost:3000/reset/${token}'>Link</a>
        to set password</p>
        `
      });
      console.log(mailSent);
      if(mailSent){
        res.status(200).json({ token: token, userId: user._id });
      }else{
        res.status(500).json("Unable to send email")
      }
    }
  }catch(err){
    res.status(500).json("server Error")
  }
};

    

exports.getNewPassword = (req, res, next) => {
  const token=req.params.token;
  User.findOne({
    resetToken:token,
    resetTokenExpiration:{$gt:Date.now()},
  }).then((user)=>{
    res.render('auth/new-password',{
      path:'/signup',
      pageTitle:'Set Password',
      token:token,
      user:user._id
    })
  })
};

exports.postNewPassword=async(req,res,next)=>{
  const{password,token,userId}=req.body;
  try{
    let user=await User.findOne({
      _id:userId,
      resetToken:token,
      resetTokenExpiration:{$gt:Date.now()},
    });
    if(!user){
      return res.status(401).json("invalid token");
    }
    const hashedPassword= await bcrypt.hash(password,12)
      user.password=hashedPassword;
      user.resetToken=undefined;
      user.resetTokenExpiration=undefined;
     user= await user.save();
     if(user){
      res.status(200).json("Ok");
     }
     else{
      res.status(404).json("unknown")
     }
    }catch(err){
      res.status(500).json("Server error")
    }
  };