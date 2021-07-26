const mongoose                 =   require('mongoose');
const passportLocalMongoose    =   require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true, required: [true, "Username Can't be Empty!"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    password: {type: String, required: true},
    date: {
        type:String,
        default:Date.now
    }
    
})

// var URLs = mongoose.model('urls', URLSchema);
UserSchema.plugin(passportLocalMongoose);

var usr = mongoose.model('usrname', UserSchema);
module.exports = usr;