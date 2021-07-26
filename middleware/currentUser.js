const jwt           =   require('jsonwebtoken');
const UserSchema    =   require('../models/usermodel');

module.exports = function(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Current User Not Found" });
    else
    {
        var user = await UserSchema.findOne(token.id);
        
    }
}