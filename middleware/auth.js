const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SEC;

module.exports = function(req, res, next) {
  const token = req.cookies.token;
  try {
    if(token)
    {
      const decoded = jwt.verify(token, SECRET);
      // TODO:
      // Validate if user exist (Can break if user is deleted from DB)
      req.user = decoded.un;
    }
    next();

  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};