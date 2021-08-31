const express       =   require("express");
const path          =   require("path");
const jwt           =   require("jsonwebtoken");
const bcrypt        =   require("bcrypt");
const UserSchema    =   require("../models/usermodel");
const router        =   express.Router();

SECRET = process.env.SEC;

router.post("/", async (req, res) => {
  let usrname = req.body.username;
  let pswrd = req.body.password;

  const user = await UserSchema.findOne({ username: usrname });
  if (!user) {
    return res.status(404).send({message: "User Not Found"});
  }

  if (await bcrypt.compare(pswrd, user.password)) {
    const token = jwt.sign({ un: usrname }, SECRET);
    res.cookie("token", token, { maxAge: 900000, httpOnly: true });
    
    res.status(200).send({
      isLoggedin: true,
      userName: usrname,
      LoginToken: token,
      message: "Logged In Sucessfully",
    });
  } else {
    return res.status(400).send({message: "Incorrect Password"});
  }
});

module.exports = router;