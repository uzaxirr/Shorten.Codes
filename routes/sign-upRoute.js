const express       =   require("express");
const router        =   express.Router();
const path          =   require("path");
const bcrypt        =   require("bcrypt");
const UserSchema    =   require("../models/usermodel");

// Router For Login
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/sign-up.html"));
});

router.post("/", async (req, res) => {
  let usrname = req.body.username;
  let pswrd = req.body.password;
  pswrd = await bcrypt.hash(pswrd, 10);

  try {
    const user = await UserSchema.findOne({ username: usrname });
    if (user) {
      return res.status(400).send("Username already in use :(");
    }

    var FoundUSER = new UserSchema({
      username: usrname,
      password: pswrd,
      date: new Date(),
    });
    FoundUSER.save();
    res.send({ status: 200, message: "User Registred Sucessfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;