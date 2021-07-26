const express           =   require("express");
const path              =   require("path");
const URLSchemaMongo    =   require("../models/urlModel");
const router            =   express.Router();
const auth              =   require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  console.table(req.user);
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

router.get("/:sludge", async (req, res) => {
  const foundObj = await URLSchemaMongo.findOne({ urlCode: req.params.sludge });
  if (foundObj) {
    var newClicks = foundObj.clicks + 1;
    foundObj.clicks = newClicks;
    console.log(foundObj.clicks);
    await foundObj.save();
    return res.redirect(foundObj.longUrl);
  } else {
    return res.status(404).json("URL Not Found");
  }
});

router.post("/", auth, async (req, res) => {
  console.table(req.user);
  const url = req.body.name_field;
  var sludge = req.body.sludge;
  const { longUrl } = req.body;
  const alreadyExist = await URLSchemaMongo.findOne({ urlCode: sludge });
  if (alreadyExist) {
    return res.send({ Error: "Sludge Already in Use" });
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
  res.end(
    JSON.stringify({
      "URL Recived": url,
      Sludge: sludge,
      "Short URL": shortURL,
    })
  );
});

module.exports = router;
