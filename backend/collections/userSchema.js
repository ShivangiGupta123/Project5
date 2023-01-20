const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
 Username : {type : String , required : true},
 Email : {type : String , required : true},
 Password : {type : String , required : true},
 Confirm_Password : {type : String , required : true},
 Phone : {type : String , required : true},
 DOB : {type : Date },
 token : {type : String}
},{timestamps : true});
module.exports = mongoose.model('user' , userSchema)
