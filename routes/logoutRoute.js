const express   =   require("express");
const router    =   express.Router();

router.get("/", (req, res) => {
  res.clearCookie("token");
  return res.status(200).send({ message: "LOgged Out!" });
});
module.exports = router;
