const express       =   require("express");
const router        =   express.Router();
const path          =   require("path");
const bcrypt        =   require("bcrypt");
const UserSchema    =   require("../models/usermodel");


router.post("/", async (req, res) => {
  let usrname = req.body.username;
  let pswrd = req.body.password;

  console.log(usrname);
  pswrd = await bcrypt.hash(pswrd, 10);
  console.log(pswrd);

  try {
    // const foundObj =  await URLSchemaMongo.findOne({urlCode: req.params.sludge});
    const user = await UserSchema.findOne({ username: usrname });
    if (user) {
      return res.status(400).send({message: "Username already in use :("});
    }

    var FoundUSER = new UserSchema({
      username: usrname,
      password: pswrd,
      date: new Date(),
    });
    FoundUSER.save();
    return res.status(200).send({message: "User Registred Sucessfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({message: "An error Occoured ;("});
  }
});

module.exports = router;
