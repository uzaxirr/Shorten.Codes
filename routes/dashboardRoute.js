const express     =  require("express");
const jwt         =  require("jsonwebtoken");
const router      =  express.Router();
const auth        =  require("../middleware/auth");
const UrlSchema   =  require("../models/urlModel");

router.post("/", auth, (req, res) => {
  const token = req.cookies.token;
  if (token) {
    const decoded = jwt.decode(token);
    const usrnameObtained = decoded.un;
    UrlSchema.find({ username: usrnameObtained }, function (err, docs) {
      if (err) {
        return res.status(401).send({ message: err });
      } else {
        const urlCount = docs.length;
        console.log(docs)
        return res.send({ status: 200, count: urlCount, links: docs });
      }
    });
  } else {
    return res.status(401).send({ message: "Auth Error" });
  }
});

module.exports = router;
