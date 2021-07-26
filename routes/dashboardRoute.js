const express     =  require("express");
const jwt         =  require("jsonwebtoken");
const router      =  express.Router();
const auth        =  require("../middleware/auth");
const UrlSchema   =  require("../models/urlModel");

router.get("/", auth, (req, res) => {
  const token = req.cookies.token;
  if (token) {
    const decoded = jwt.decode(token);
    const usrnameObtained = decoded.un;
    UrlSchema.find({ username: usrnameObtained }, function (err, docs) {
      if (err) {
        return res.send({ status: 401, msg: err });
      } else {
        const urlCount = docs.length;
        return res.send({ status: 200,count: urlCount, links: docs });
      }
    });
  } else {
    res.status(401).send({ message: "Auth Error" });
  }
});

module.exports = router;
