const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: [true, 'Please enter an userName'],
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
    }
  });

  //fire a function before doc saved to db
  userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  //static method to login user
  userSchema.statics.login = async function(userName, password){
    const user = await this.findOne({userName});
    if(user){
      const auth = await bcrypt.compare(password, user.password);
      if(auth){
        return user;
      }
      throw Error('Incorrect Password');
    }
    throw Error('Incorrect user name');
  }
 
  
  const User = mongoose.model('user', userSchema);

  module.exports = User;