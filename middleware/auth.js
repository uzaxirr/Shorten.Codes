const jwt = require("jsonwebtoken");

SECRET = "yghjerhuir@#$%^&*()oiujhbe)*&!789323889029"

module.exports = function(req, res, next) {
  const token = req.cookies.token;
  console.log('TOKEN OBTAINED: ', token);
  //if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    if(token)
    {
      const decoded = jwt.verify(token, SECRET);
      // TODO:
      // Validate if user exist (Can break if user is deleted from DB)
      req.user = decoded.un;
      console.log("FROM DECODED ",decoded);
      //console.table(req.user);
    }
    next();

  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};