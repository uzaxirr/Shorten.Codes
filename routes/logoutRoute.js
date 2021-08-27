const express   =   require("express");
const router    =   express.Router();

router.get("/", (req, res) => {
  res.clearCookie("token");
  return res.status(200).send({ isLoggedin: false });
});
module.exports = router;
