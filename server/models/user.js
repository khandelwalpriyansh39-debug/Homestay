const mongoose = require('mongoose');


const userSchema=new mongoose.Schema(
  {
    first_name:{type:String,required:true},
    last_name:String,
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    userType:{type:String,required:true,enum:['host','guest'],default:'guest'},
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Home' }],
  }
)

module.exports = mongoose.model('User', userSchema);

//here we export mongoose model User which made from schema 'userSchema'