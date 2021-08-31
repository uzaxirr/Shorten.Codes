const express           =   require("express");
const path              =   require("path");
const URLSchemaMongo    =   require("../models/urlModel");
const router            =   express.Router();
const auth              =   require("../middleware/auth");

router.get("/:sludge", async (req, res) => {
  const foundObj = await URLSchemaMongo.findOne({ urlCode: req.params.sludge });
  if (foundObj) {
    var newClicks = foundObj.clicks + 1;
    foundObj.clicks = newClicks;
    await foundObj.save();
    return res.redirect(foundObj.longUrl);
  } else {
    return res.status(404).json("URL Not Found");
  }
});

router.post("/", auth, async (req, res) => {
  console.table(req.user);
  const url = req.body.url;
  var sludge = req.body.sludge;
  const { longUrl } = req.body;
  const alreadyExist = await URLSchemaMongo.findOne({ urlCode: sludge });
  if (alreadyExist) {
    return res.status(400).send({
      message: "Nickname already in use :("
    });
  }
  let shortURL = "https://shorten.codes/" + sludge;
  //var foundURL =  await URLSchemaMongo.findOne({url});
  let GenBy = req.user || null;
  var foundURL = new URLSchemaMongo({
    longUrl: url,
    shortUrl: shortURL,
    urlCode: sludge,
    clicks: 0,
    username: GenBy,
    date: new Date(),
  });
  foundURL.save();

  res.setHeader("Content-Type", "application/json");
  res.status(200).end(
    JSON.stringify({
      longUrl: url,
      sludge: sludge,
      shortUrl: shortURL,
    })
  );
});

module.exports = router;
