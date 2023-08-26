const express = require("express");

const {
  postLogin,
  postSignup,
  postReset,
  postNewPassword,
} = require("../controllers/auth");

const router = express.Router();



router.post("/signup", postSignup);

router.post("/reset", postReset);

router.post("/new-password", postNewPassword);

router.post("/login", postLogin);


// router.post("/logout", postLogout);





module.exports = router;
