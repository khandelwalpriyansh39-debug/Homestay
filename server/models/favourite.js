const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
  houseId:
  {
     type:mongoose.Schema.Types.ObjectId,  // here it is special type ehich refer from Homr model 
     ref:"Home",
     required:true,
     unique:true,
  }

});

module.exports = mongoose.model('Favourite', favouriteSchema );