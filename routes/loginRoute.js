const express       =   require("express");
const path          =   require("path");
const jwt           =   require("jsonwebtoken");
const bcrypt        =   require("bcrypt");
const UserSchema    =   require("../models/usermodel");
const router        =   express.Router();

//TODO: Handle breakage case of wrong password



const SECRET = process.env.MONGO_URL;

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/login.html"));
});

router.post("/", async (req, res) => {
  let usrname = req.body.username;
  let pswrd = req.body.password;

  const user = await UserSchema.findOne({ username: usrname });
  if (!user) {
    res.send({ status: 404, message: "User Not Found" });
  }

  if (await bcrypt.compare(pswrd, user.password)) {
    const token = jwt.sign({ un: usrname }, SECRET);
    res.cookie("token", token, { maxAge: 900000, httpOnly: true });
    res.send({
      status: 200,
      LoginToken: token,
      message: "Logged In Sucessfully",
    });
  }
});

module.exports = router;